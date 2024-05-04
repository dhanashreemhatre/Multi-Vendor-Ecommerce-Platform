"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './cart.module.css';
import Image from 'next/image';

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
  }, []);

  useEffect(() => {
    const calculateTotal=()=>{

    }
   
    const calculateTotalShippingCharges = () => {
      let totalCharges = 0;
      cartItems.forEach(item => {
        // Logic to calculate shipping charges for each item
        // You can replace this with your own logic
        const shippingCharges = calculateShippingChargesForItem(item);
        totalCharges += shippingCharges;
      });
      setTotalShippingCharges(totalCharges);
      calculateTotal();
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
      <h1>Cart</h1>
      <div className='sm:grid grid-cols-2'>
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className={`${styles.cart_item} m-4 p-4`}>
              <p>{item.product.id}</p>
              <Image src={`http://127.0.0.1:8000/${decodeURIComponent(item.product.image) || ''}`}
                priority width={100} height={100}
                alt={item.product.title} />
              <div className={styles.cart_item_info}>
                <h2>{item.product.title}</h2>
                <h4>{item.product.price} <span>{item.product.old_price}</span></h4>
                <div className="quantity">
                  {item.quantity}
                </div>
                <button onClick={() => handleRemoveCartItem(item.product.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.cart_box} m-4 p-4`}>
          <h2>Total Shipping Charges: ${totalShippingCharges}</h2>
          Checkout
        </div>
      </div>
    </div>
  );
};

export default CartPage;
