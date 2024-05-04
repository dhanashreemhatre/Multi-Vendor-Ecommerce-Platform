  import React, { useState, useEffect } from 'react';
  import styles from './addtocartbutton.module.css';
  import Cookies from "js-cookie";

  interface AddToCartButtonProps {
    pid: string; // Product ID
  }

  const AddToCartButton: React.FC<AddToCartButtonProps> = ({ pid }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      // Fetch user ID from localStorage
      const userId = localStorage.getItem('userId');
      if (userId) {
        console.log('User ID:', userId);
      } else {
        console.error('User ID not found in localStorage');
      }
    }, []);

    const addToCart = async () => {
      try {
        setLoading(true);
        
        // Fetch user ID from localStorage
        const userId = Cookies.get('user');
        if (!userId) {
          throw new Error('User ID not found in localStorage');
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
        
        alert('Item added to cart successfully');
      } catch (error:any) {
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
