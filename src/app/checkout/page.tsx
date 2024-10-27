"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Footer from '../../../Components/Ui/Footer/page';
import Navbar from '../../../Components/Ui/Navbar/page';
import Loader from '../../../Components/Ui/Loader/page';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}


// razorpay.d.ts
interface RazorpayOptions {
  key: string; // Your Razorpay key
  amount: number; // Amount in paise
  currency: string; // Currency code
  name: string; // Your company name
  description: string; // Description of the payment
  image: string; // Your company logo
  order_id?: string; // Order ID if applicable
  handler: (response: any) => void; // Payment success handler
  prefill?: {
    name?: string; // Customer name
    email?: string; // Customer email
    contact?: string; // Customer contact number
  };
  notes?: {
    [key: string]: string; // Any additional notes
  };
  theme?: {
    color?: string; // Theme color
  };
}

// Extend the Window interface
declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): {
        open: () => void; // Method to open the payment modal
      };
    };
  }
}


const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [payment, setpayment] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
  });
  const [apply, setApply] = useState({
    coupon: ''
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [newTotal, setNewTotal] = useState(0);

  useEffect(() => {
    // Fetch cart items from your API
    fetchCartItems();
  }, []);

  useEffect(() => {
    // Calculate total amount whenever cart items change
    calculateTotal();
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const userId = Cookies.get('user');
      if (!userId) {
        throw new Error('User ID not found in cookies');
      }
      const response = await fetch(`https://django-ecom-three.vercel.app/cart/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${userId}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        console.error('Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const calculateTotal = () => {
    if (!Array.isArray(cartItems)) {
      console.error('Cart items is not an array:', cartItems);
      setTotalAmount(0);
      return;
    }
    const total = cartItems.reduce((sum, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return sum + price * quantity;
    }, 0);
    setTotalAmount(total);
    setNewTotal(total); // Initialize newTotal with total amount
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCouponApply = async (e:any) => {
    e.preventDefault();
    try {
      const userId = Cookies.get('user');
      const response = await axios.post('https://django-ecom-three.vercel.app/order/apply-coupon/', {
        userId: userId,
        coupon_code: apply.coupon,
        total_amount: totalAmount,
      });
      const { new_total } = response.data;
      setNewTotal(new_total);
      setApply((prevState) => ({
        ...prevState,
        coupon: '', // Clear coupon field after applying
      }));
    } catch (error:any) {
       
      console.error('Error applying coupon:', error.response);
      // Handle error (e.g., display error message to the user)
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    await handlePlaceOrder();
  };

  const handlePayment = async () => {
    const amountInPaisa = newTotal * 100; 
    try {
      const response = await axios.post(
        'https://rajor-wnd4.vercel.app/createOrder',
        { ...formData, amount: amountInPaisa / 100 }
      );

      const { data } = response;

      if (data.success) {
        const options = {
          key: data.key_id,
          amount: data.amount,
          currency: 'INR',
          image: '',
          name: data.product_name,
          description: data.description,
          order_id: data.order_id,
          handler: function (response:any) {
            alert('Payment Succeeded');
            setpayment(false);
          },
          prefill: {
            contact: data.contact,
            name: data.name,
            email: data.email
          },
          notes: {
            description: data.description
          },
          theme: {
            color: '#2300a3'
          }
        };
        const razorpayObject = new window.Razorpay(options);
        razorpayObject.open();
      } else {
        alert(data.msg);
        setpayment(false);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setpayment(false);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

 
  const handlePlaceOrder = async () => {
    const userId = 3
    // if (!userId) {
    //   console.error('User ID not found in cookies');
    //   return;
    // }
  
    try {
      setpayment(true)
      const orderData = {
        email: formData.email,
        total_amount: totalAmount,
        items: cartItems.map(item => ({
          product: item.product?.id, // Ensure product_id is correctly formatted
        quantity: item.quantity,
        price: item.product?.price
        })),
        shipping_address: {
          user: userId,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          state: formData.state,
          zip_code: formData.zip_code
        }
      };
  
      console.log('Order Data:', orderData); // Log orderData for debugging
  
      const response = await fetch('https://django-ecom-three.vercel.app/order/create-order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${userId}`,
        },
        body: JSON.stringify(orderData)
      });
  
      const responseData = await response.json(); // Assuming your API returns JSON
  
      if (response.ok) {
        
        console.log('Order placed successfully');

       handlePayment()
       
        // Handle success, like redirecting to confirmation page or clearing cart
      } else {
        console.error('Failed to place order:', responseData);
        setpayment(false);
       

        // Handle failure, display error message or retry logic
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setpayment(false);
    

      // Handle general errors, like network issues or unexpected responses
    }

  };



  
  

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
  <a href="#" className="text-2xl font-bold text-gray-800">Inclusify Checkout</a>
  <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
    <div className="relative">
      <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
            ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg
          ></a>
          <span className="font-semibold text-gray-900">Shop</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
            ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg
          ></a>
          <span className="font-semibold text-gray-900">Shipping</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
          <span className="font-semibold text-gray-500">Payment</span>
        </li>
      </ul>
    </div>
  </div>
</div>
<div className="grid pb-10 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Order Summary</p>
    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`https://django-ecom-three.vercel.app/${decodeURIComponent(item.product.image) || ''}`} alt={item.product.name} />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.product.name}</span>
                  <span className="float-right text-gray-400">Quantity: {item.quantity}</span>
                  <p className="text-lg font-bold">Rs.{item.product.price}</p>
                </div>
              </div>
            ))}
        </div>

    <p className="mt-8 text-lg font-medium">Shipping Methods</p>
    <form className="mt-5 grid gap-6">
      <div className="relative">
        <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1" >
          <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
          <div className="ml-5">
            <span className="mt-2 font-semibold">Fedex Delivery</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
          </div>
        </label>
      </div>
      <div className="relative">
        <input className="peer hidden" id="radio_2" type="radio" name="radio" defaultChecked />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
          <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
          <div className="ml-5">
            <span className="mt-2 font-semibold">Fedex Delivery</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
          </div>
        </label>
      </div>
    </form>
  </div>
  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
    <form onSubmit={handleSubmit}>
    <p className="text-xl font-medium">Payment Details</p>
    <p className="text-gray-400">Complete your order by providing your payment details.</p>
    <div className="">
      <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
      <div className="relative">
        <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" 
         value={formData.email}
      onChange={handleInputChange} />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
      </div>
      <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Country</label>
      <div className="relative">
        <input type="text" id="country" name="country" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Country"
         value={formData.country}
         onChange={handleInputChange} />

      </div>
      <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">City</label>
      {/* <div className="flex"> */}
        <div className="relative w-7/12 flex-shrink-0">
          <input type="text" id="city" name="city" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="City"
          value={formData.city}
          onChange={handleInputChange} />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
            </svg>
          </div>
        </div>
       
      <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex-shrink-0 sm:w-7/12">
          <input type="text" id="address" name="address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address"
           value={formData.address}
           onChange={handleInputChange} />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
          </div>
        </div>
        <select name="state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        value={formData.state} 
        onChange={handleInputChange} 
        >
          <option value="State">State</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>

        <input type="text" id='zip_code' name="zip_code" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" 
        value={formData.zip_code}
        onChange={handleInputChange}/>
      </div>
  
      <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Subtotal</p>
          <p className="font-semibold text-gray-900">{totalAmount.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Shipping</p>
          <p className="font-semibold text-gray-900">Rs. 8.00</p>
        </div>
      </div>
      
  <label htmlFor="coupon" className="mt-4 mb-2 block text-sm font-medium text-gray-400">
    Enter 'INCLUSIFY100' to avail 30% off on Your First Order
  </label>
  <div className="flex gap-3">
    <input
      type="text"
      id="coupon"
      name="coupon"
      className="w-50 h-12 mt-4 rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
      placeholder="Coupon Code"
      value={apply.coupon}
      onChange={(e) => setApply({ ...apply, coupon: e.target.value })}
    />
    <button
      type="submit"
      onClick={handleCouponApply}
      disabled={payment} // Disable button during payment processing
      className="mt-4 mb-8 w-40 h-12 rounded-md bg-emerald-500  font-medium text-white"
      
    >
      Apply Coupon
    </button>
  </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">Rs. {newTotal.toFixed(2)}</p>
      </div>
    </div>
    
    <button type='submit' disabled={payment} className="mt-4 mb-8 w-full rounded-md bg-emerald-500 px-6 py-3 font-medium text-white">{payment ? 'Processing payment':'Place Order'}</button>
    </form>
  </div>
</div>
<Footer />

    </>
  )
}

export default CheckoutPage