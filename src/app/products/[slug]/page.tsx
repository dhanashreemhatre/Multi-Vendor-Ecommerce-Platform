"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './../../../../Components/Ui/Navbar/page';
import Footer from './../../../../Components/Ui/Footer/page';
import ProductBox from '../../../../Components/Ui/Product/ProductCard/page';
import styles from './product_categories.module.css'
const CategoryPage = () => {

  const  cid  = usePathname().split('/').pop();; // Get the category ID from the URL query parameters
  const [category, setCategory] = useState(null);
  // console.log(cid)
  useEffect(() => {

    const fetchCategory = async () => {
      try {
        if (!cid) return; // Return if the category ID is not available yet
        const response = await fetch(`http://127.0.0.1:8000/categories/${cid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch category details');
        }
        const categoryData = await response.json(); // Convert response to JSON format
        setCategory(categoryData);
      } catch (error) {
        console.error('Error fetching category details:', error);
        // Handle error here
      }
    };

    fetchCategory();
  }, [cid]);

  return (
    <div>
      <Navbar />
     {category && (
        <div className={styles.categories}>
          <h1>{category.category.title}</h1>
          <p>{category.category.description}</p>
        
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
            {category.products.length > 0 ? (
              category.products.map(product => (
                <ProductBox
                  key={product.id}
                  pid={product.pid} // Pass pid to ProductBox component
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  oldPrice={product.old_price}
                />
              ))
            ) : (
              <p>No products under this category yet.</p>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CategoryPage;
