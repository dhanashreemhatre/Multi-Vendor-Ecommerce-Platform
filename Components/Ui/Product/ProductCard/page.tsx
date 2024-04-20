import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './productcard.module.css'
import AddToCartButton from './../AddToCartButton/page'

interface ProductBoxProps {
  image: string;
  title: string;
  price: number;
  oldPrice: number;
}

const ProductBox: React.FC<ProductBoxProps> = ({
  image,
  title,
  price,
  oldPrice,
}) => {
  return (
    <div className={styles.product_box}>
      <>
        <Image
          alt="loading-image"
          className={styles.product_img_front}
          src={`http://127.0.0.1:8000/${decodeURIComponent(image) || ""}`}
          priority
          width={200}
          height={200}
        />
        <Link href="/Items">
          <h1>{title || "Loading..."}</h1>
        </Link>
        <span className={styles.price}>
          ${price || 0} <span className={styles.old_price}>${oldPrice || 0}</span>
        </span>
        <AddToCartButton />
      </>
    </div>
  );
};

export default ProductBox;
