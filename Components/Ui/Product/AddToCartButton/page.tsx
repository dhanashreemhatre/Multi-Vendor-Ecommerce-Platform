'use client';
import React, { useState } from 'react';
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
  const [showLoginAlert, setShowLoginAlert] = useState(false); // State variable to control the visibility of Loginalert

  const router = useRouter();

  const playAudio = (path: string) => {
    const audio = new Audio(path);
    audio.play();
  };

  const addToCart = async () => {
    try {
      setLoading(true);

      // Fetch user ID from localStorage
      const userId = Cookies.get('user');
      const token = Cookies.get('jwtToken');
      const email = localStorage.getItem('userEmail');

      if (!token && !email) {
        playAudio('/Sound/error.mp3');
        setShowLoginAlert(true);
        
        setTimeout(() => {
          setShowLoginAlert(false);
        }, 2000);
        throw new Error('Please log in to add items to the cart');
      }

      const response = await fetch(`https://django-ecom-three.vercel.app/add-to-cart/${pid}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pid, userId }), // Include user ID in the request payload
      });

      if (!response.ok) {
        setShowLoginAlert(true);
        playAudio('/Sound/error.mp3');
        setTimeout(() => setShowAlert(false), 2000);
        throw new Error('Failed to add item to cart');
      }

      setShowAlert(true);
      playAudio('/Sound/item.mp3');
      setTimeout(() => setShowAlert(false), 2000); // Hide the alert after 2 seconds

      const data = await response.json();
      console.log(data);
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
      {showAlert && <Itemalert  bullet="Success" message="Item added to cart" color="#50C878"/>} {/* Conditionally render the Itemalert component */}
      {showLoginAlert && <Itemalert bullet="hey" message="Please login before adding Item to Cart" color="#800020" />} 
    </>
  );
};

export default AddToCartButton;
