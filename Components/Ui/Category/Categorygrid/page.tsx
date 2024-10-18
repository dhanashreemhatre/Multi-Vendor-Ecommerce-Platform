import React, { useState, useEffect } from 'react';
import CategoryCard from '../CategoryCard/page'; // Adjust path if necessary
import styles from './categorygrid.module.css';

interface Category {
  cid: string;
  title: string;
  image: string;
}

function Page() {
  const [categories, setCategories] = useState<Category[]>([]); // Initialize categories state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://django-ecom-three.vercel.app/categories/');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        // Check if error is an instance of Error
        if (error instanceof Error) {
          console.error('Error fetching categories:', error.message);
          setErrorMessage(error.message); // Set the error message state
        } else {
          console.error('An unknown error occurred');
          setErrorMessage('An unknown error occurred');
        }
      }
    };

    fetchCategories();
  }, []);

  // Handle error display
  if (errorMessage) {
    return <div>Error: {errorMessage}</div>; // Display error message if present
  }

  return (
    <div className={styles.categories_product_items}>
      <div className={styles.categories_heading}>
        <h1>Classification</h1>
        <p>Shop By Categories</p>
      </div>
      <div className={styles.categories_items1}>
        {categories.map((category) => (
          <CategoryCard key={category.cid} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Page;
