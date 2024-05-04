import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js for your React application
import styles from './categorycard.module.css';

function CategoryCard({ category }) {
  console.log(category.image)
  return (
    <div className={styles.box_product}>
      <Image src={`http://127.0.0.1:8000/${decodeURIComponent(category.image) || ""}`} alt="category-image" width={200} height={200} />
      <h1>{category.title}</h1>
      <button>Explore Now</button>
    </div>
  );
}

export default CategoryCard;
