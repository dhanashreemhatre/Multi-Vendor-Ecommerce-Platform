import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import styles from './categorycard.module.css';

interface Category {
  title: string;
  image: string;
  cid: string;
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className={styles.box_product}>
      {/* Ensure category.image exists before decoding and using it */}
      <Image
        src={`https://django-ecom-three.vercel.app/${category.image ? decodeURIComponent(category.image) : ""}`}
        alt={`Image of ${category.title}`} // Use dynamic alt text for accessibility
        width={200}
        height={200}
        layout="fixed" // Keeps the image size fixed
      />
      <div className={styles.category_info}>
        <h1>{category.title}</h1>
        {/* Wrap the button inside the Link */}
        <Link href={`/products/${category.cid}`}>
            <button>Explore Now</button>
          
        </Link>
      </div>
    </div>
  );
}

export default CategoryCard;
