"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Navbar from './../../../../Components/Ui/Navbar/page';
import Footer from './../../../../Components/Ui/Footer/page';
import styles from './product-details.module.css';
import Image from "next/image";
import Share from "./image/share-2.png";
import Like from "./image/heart.png";
import star from "./image/icons8-star-48.png";
import Boys from "./image/7309681.jpg";

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
  const pathname = usePathname();
  const pid = pathname.split("/").pop();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/products/${pid}/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("API Response:", data);

        setProductDetails({
          pid: data.pid,
          image: data.image,
          name: data.name,
          price: data.price,
          discountedPrice: data.discountedPrice,
          old_price: data.old_price,
          title: data.title,
        });
      } catch (error: any) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProductDetails();
  }, [pid]);

  return (
    <div>
      <Navbar />
      <div className={styles.product_details}>
        <div className={styles.product_image}>
          {productDetails ? (
            <Image
              src={`http://127.0.0.1:8000/${decodeURIComponent(productDetails.image)}`}
              alt='Product-Image'
              height={100}
              width={100}
              className={styles.image}
            />
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div className={styles.product_info}>
          <div className={styles.title_product}>
            <h1>{productDetails?.title || "Loading..."}</h1>
            <div className={styles.review}>
              <Image src={star} alt="loading image" priority height={24} />
              <Image src={star} alt="loading image" priority height={24} />
              <h1>(200 reviews)</h1>
            </div>
            <p>Basically I just want to run through the database and make some calculations/updates.</p>

            <div className={styles.price_items}>
              <div className={styles.price}>
                <h1>{productDetails ? `${productDetails.price} Rs.` : "Loading..."}</h1>
                <h2>Free shipping is available</h2>
              </div>
              <div className={styles.cart}>
                <button>Add To Cart</button>
              </div>
            </div>
          </div>
          <div className={styles.icons}>
            <div className={styles.share}>
              <Image src={Share} alt="Share icon" priority />
              <h2>Share</h2>
            </div>
            <div className={styles.save}>
              <Image src={Like} alt="Save icon" priority />
              <h2>Save</h2>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.prod_desc}>
        <div className={styles.prod_desc_item}>
          <h1>Description</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At quae
            adipisci, blanditiis dolorem vel officiis placeat dignissimos
            vitae facilis sint{" "}
          </p>
          <h1>Specifications</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At quae
            adipisci, blanditiis dolorem vel officiis placeat dignissimos
            vitae facilis sint{" "}
          </p>
        </div>
      </div>
      <div className={styles.customer_review}>
        <div className={styles.customer_review_items}>
          <h1>Customer Reviews</h1>
          <div className={styles.user_detalis}>
            <div className={styles.avtar_user1}>
              <Image
                src={Boys}
                alt="loading image"
                height={32}
                width={32}
                className={styles.avtar_boys}
              />
              <div className={styles.name}>
                <h1>Satyam</h1>
                <h2>14-02-2020</h2>
              </div>
            </div>
            <div className={styles.review_main}>
              <h1>Nice Product</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Facilis suscipit magnam et quos laborum modi blanditiis enim
                numquam adipisci deserunt dolores eaque similique voluptatibus
                nisi earum,
              </p>
            </div>
            <div className={styles.avtar_user1}>
              <Image
                src={Boys}
                alt="loading image"
                height={32}
                width={32}
                className={styles.avtar_boys}
              />
              <div className={styles.name}>
                <h1>Gauri</h1>
                <h2>14-02-2020</h2>
              </div>
            </div>
            <div className={styles.review_main}>
              <h1>Bad Product</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Facilis suscipit magnam et quos laborum modi blanditiis enim
                numquam adipisci deserunt dolores eaque similique voluptatibus
                nisi earum,
              </p>
            </div>
            <div className={styles.buttons_review}>
              <div className={styles.box1_button}>See All Products</div>
              <div className={styles.box1_button}>Add Your Review</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
