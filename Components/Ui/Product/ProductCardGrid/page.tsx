import React, { useEffect, useState } from "react";
import ProductBox from "./../ProductCard/page";
import styles from './productcardgrid.module.css'

interface ProductDetails {
  pid: string; 
  image: string;
  name: string;
  price: number;
  discountedPrice: number;
  old_price: number;
  title: string;
}

function Page() {
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch("https://django-ecom-three.vercel.app/products/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log("API Response:", data);

        setProductDetails(
          data.map((product: any) => ({
            pid: product.pid, 
            image: product.image,
            name: product.name,
            price: product.price,
            discountedPrice: product.discountedPrice,
            old_price: product.old_price,
            title: product.title,
          }))
        );
      } catch (error: any) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProductDetails();
  }, []);

  return (
    <div className={styles.product_grid}>
      {productDetails.map((product: ProductDetails, index: number) => (
        <ProductBox
          key={index}
          pid={product.pid} // Pass pid to ProductBox component
          image={product.image}
          title={product.title}
          price={product.price}
          oldPrice={product.old_price}
        />
      ))}
    </div>
  );
}

export default Page;
