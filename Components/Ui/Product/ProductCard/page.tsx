import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './productcard.module.css';
import AddToCartButton from './../AddToCartButton/page';

interface ProductBoxProps {
  pid: string;
  image: string;
  title: string;
  price: number;
  oldPrice: number;
}

const truncateTitle = (title:string, wordLimit:number) => {
  const words = title.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '......';
  }
  return title;
};

const ProductBox: React.FC<ProductBoxProps> = ({
  pid,
  image,
  title,
  price,
  oldPrice,
}) => {
  const imageUrl = `https://django-ecom-three.vercel.app${image}`;
  return (
    <div className={styles.product_box}>
      <>
        <Image
          alt="loading-image"
          className={styles.product_img_front}
          src={imageUrl}
          priority
          width={200}
          height={200}
        />
        <Link href={`/product-details/${pid}`}>
          <h1>{truncateTitle(title || "Loading...", 6)}</h1>
        </Link>
        <span className={styles.price}>
          ₹{price || 0} <span className={styles.old_price}>₹{oldPrice || 0}</span>
        </span>
        <AddToCartButton pid={pid} />
      </>
    </div>
  );
};

export default ProductBox;
