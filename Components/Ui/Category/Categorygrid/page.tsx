import React, { useState, useEffect } from 'react';
import CategoryCard from '../CategoryCard/page';
import styles from './categorygrid.module.css';

function Page() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/categories/');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

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
