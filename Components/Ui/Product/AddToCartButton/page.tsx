'use client';
import React, { useState, useEffect } from 'react';
import styles from './addtocartbutton.module.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
  pid: string; // Product ID
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ pid }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  
  // const inlogin = () => {
  //   const message = 'Please login, before adding Items to Cart';
  //   let speech = new SpeechSynthesisUtterance(message);
  
  //   const voices = window.speechSynthesis.getVoices();
  //   const indianVoice = voices.find(voice => voice.lang === 'en-IN' || voice.name.toLowerCase().includes('india'));
  
  //   if (indianVoice) {
  //     speech.voice = indianVoice;
  //   }
  
  //   window.speechSynthesis.speak(speech);
  // }
  // const cartadded = () => {
  //   const message = 'Item added to Cart';
  //   let speech = new SpeechSynthesisUtterance(message);
  
  //   const setIndianVoice = () => {
  //     const voices = window.speechSynthesis.getVoices();
  //     const indianVoice = voices.find(voice => voice.lang === 'en-IN' || voice.name.toLowerCase().includes('india'));
  
  //     if (indianVoice) {
  //       speech.voice = indianVoice;
  //     }
  
  //     window.speechSynthesis.speak(speech);
  //   };
  
  //   if (window.speechSynthesis.getVoices().length === 0) {
  //     window.speechSynthesis.addEventListener('voiceschanged', setIndianVoice);
  //   } else {
  //     setIndianVoice();
  //   }
  // };

  const addToCart = async () => {
    try {
      setLoading(true);
      
      // Fetch user ID from localStorage
      const userId = Cookies.get('user');
      const token = Cookies.get('jwtToken');
      const email = localStorage.getItem('userEmail');
      
      if (!token && !email) {
        // Play the login sound
        // loginAudio?.play();
        // inlogin();
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

      // Play the cart sound
      // cartAudio?.play();
      // cartadded();
      
      const data = await response.json();
      console.log(data);
      
      // Optionally, you can redirect to the cart page
      // router.push('/cart');
    } catch (error: any) {
      setError(error.message || 'Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className={styles.add_to_cart} onClick={addToCart} disabled={loading}>
      {loading ? 'Adding...' : 'Add to cart'}
    </button>
  );
};

export default AddToCartButton;
