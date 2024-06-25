import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import styles from './categorycard.module.css';

function CategoryCard({ category }) {
  
  return (
    <div className={styles.box_product}>
      <Image src={`http://127.0.0.1:8000/${decodeURIComponent(category.image) || ""}`} alt="category-image" width={200} height={200} />
      <div className={styles.category_info}>
        <h1>{category.title}</h1>
        {/* Use Link to redirect when the button is clicked */}
        <Link href={`/products/${category.cid}`}>
          <button>Explore Now</button>
        </Link>
      </div>
    </div>
  );
}

export default CategoryCard;
