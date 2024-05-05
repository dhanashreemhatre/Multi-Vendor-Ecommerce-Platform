"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './cart.module.css';
import Image from 'next/image';
import { AnyJson } from 'three/examples/jsm/nodes/Nodes.js';
import bin from './Images/trash.png'
import Navbar from './../../../Components/Ui/Navbar/page'
import Footer from './../../../Components/Ui/Footer/page'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalShippingCharges, setTotalShippingCharges] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const userId = Cookies.get('user');
        if (!userId) {
          throw new Error('User ID not found in cookies');
        }
        const response = await fetch(`http://127.0.0.1:8000/cart/`, {
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

    fetchCartData();
  }, [cartItems]);
  useEffect(()=>{
    const calculateTotal=()=>{
      let total=0;
      cartItems.forEach(item=>{
        total+=item.product.price*item.quantity;

      });
      setCartTotal(total);
    }
    calculateTotal();
  },[cartItems])

  useEffect(() => {
   
   
    const calculateTotalShippingCharges = () => {
      let totalCharges = 0;
      cartItems.forEach(item => {
        const shippingCharges = calculateShippingChargesForItem(item);
        totalCharges += shippingCharges;
      });
      setTotalShippingCharges(totalCharges);
    };

    calculateTotalShippingCharges();
  }, [cartItems]);

  const calculateShippingChargesForItem = (item) => {
   
    return item.quantity * 5; // Assuming $5 per item
  };

  const handleRemoveCartItem = async (cartItemId) => {
    try {
      const userId = Cookies.get('user');
      const response = await fetch(`http://127.0.0.1:8000/remove-from-cart/${cartItemId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${userId}` // Send user ID in the Authorization header
        },
      });
      if (response.ok) {
        // Remove the deleted item from the cartItems state
        setCartItems(cartItems.filter(item => item.id !== cartItemId));
      } else {
        console.error('Failed to remove cart item');
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  return (
    <div>
      <Navbar/>
      <h1 className={styles.heading_1}>Your Cart</h1>
      <div className='sm:grid grid-cols-2'>
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className={`${styles.cart_item} m-4 p-4`}>
              {/* <p>{item.product.id}</p> */}
              <Image src={`http://127.0.0.1:8000/${decodeURIComponent(item.product.image) || ''}`}
                priority width={100} height={100}
                alt={item.product.title} />
              <div className={styles.cart_item_info}>
                <h2>{item.product.title}</h2>
                <h4>{item.product.price} <span>{item.product.old_price}</span></h4>
                <div className="quantity">
                  {item.quantity}
                </div>
                <button onClick={() => handleRemoveCartItem(item.product.id)}><Image src={bin} alt='delete' height={28} width={28}/></button>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.cart_box} m-4 p-4`}>
          <h2>Total Shipping Charges: <span>₹{totalShippingCharges}</span></h2>
          <h2>Cart Total: <span>₹{cartTotal}</span></h2>
          <button className={styles.checkout_btn}>Checkout</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CartPage;
