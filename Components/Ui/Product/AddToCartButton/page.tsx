'use client';
import React, { useState, useEffect } from 'react';
import styles from './addtocartbutton.module.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Itemalert from '../../Alert/alert';

interface AddToCartButtonProps {
  pid: string; // Product ID
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ pid }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false); // State variable to control the visibility of Itemalert
  
  const router = useRouter();

  const addToCart = async () => {
    try {
      setLoading(true);
      
      // Fetch user ID from localStorage
      const userId = Cookies.get('user');
      const token = Cookies.get('jwtToken');
      const email = localStorage.getItem('userEmail');
      
      if (!token && !email) {
        throw new Error('Please log in to add items to the cart');
      }

      const response = await fetch(`http://127.0.0.1:8000/add-to-cart/${pid}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pid, userId }), // Include user ID in the request payload
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const cartAudio = new Audio('/Sound/item.mp3');
      cartAudio.play();

      const data = await response.json();
      console.log(data);
      
      setShowAlert(true); // Show the alert when the item is successfully added to the cart
    } catch (error: any) {
      setError(error.message || 'Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className={styles.add_to_cart} onClick={addToCart} disabled={loading}>
        {loading ? 'Adding...' : 'Add to cart'}
      </button>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      {showAlert && <Itemalert />} {/* Conditionally render the Itemalert component */}
    </>
  );
};

export default AddToCartButton;
