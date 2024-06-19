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
import Link from 'next/link';
import { div } from 'three/examples/jsm/nodes/Nodes.js';


function Page() {
  const pathname = usePathname();
  const pid = pathname.split("/").pop();
  const [productDetails, setProductDetails] = useState(null);
  const [reviewPopup,setReviewPopup]=useState(false)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/products/${pid}/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setProductDetails(data);
      } catch (error: any) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProductDetails();
  }, [pid]);
  const handleAddReview=(e)=>{
    e.preventDefault();
    setReviewPopup(true)
  }
  const handleCancelReview=(e)=>{
    e.preventDefault();
    setReviewPopup(false);
  }

  return (
    <div>
      <Navbar />
      <div className={styles.product_details}>
        <div className={styles.product_image}>
          {productDetails ? (
            <Image
              src={`http://127.0.0.1:8000/${decodeURIComponent(productDetails.product.image)}`}
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
            <h1>{productDetails?.product.title || "Loading..."}</h1>
            <div className={styles.review}>
              <Image src={star} alt="loading image" priority height={24} />
              <Image src={star} alt="loading image" priority height={24} />
              <h1>(200 reviews)</h1>
            </div>
            <p>{productDetails?.product.description || "Loading..."}</p>


            <div className={styles.price_items}>
              <div className={styles.price}>
                <h1>{productDetails ? `${productDetails.product.price} Rs.` : "Loading..."}</h1>
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
            {productDetails?.product.short_description || "Loading.."}
          </p>
          <h1>Specifications</h1>
          <p>
            {productDetails?.product.specification || "Loading..."}
          </p>
        </div>
      </div>
      <div className={styles.customer_review}>
        <div className={styles.customer_review_items}>
          <h1>Customer Reviews</h1>
          <div className={styles.user_detalis}>
          {productDetails?.review.length > 0 ? (
              productDetails.review.map((review, index) => (
                <div key={index}>
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
                      <h2>{new Date(review.created_date).toLocaleDateString()}</h2>
                    </div>
                  </div>
                  <div className={styles.review_main}>
                    <h1>{review.subject}</h1>
                    <p>{review.review}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Reviews Yet.</p>
            )}
                        

            <div className={styles.buttons_review}>
              <div className={styles.box1_button}><Link href="/products">See All Products</Link></div>
              <div className={styles.box1_button} onClick={handleAddReview}>Add Your Review</div>

             {reviewPopup && 
             <div className='sm:flex gap-4'>
              <input type='text' placeholder='subject' className='px-4 py-2 border rounded-md'/>
              <input type='text' placeholder='Review' className='px-4 py-2 border rounded-md'/>
              <button type='submit' className='bg-slate-600 hover:bg-slate-800 text-white px-4 py-2 rounded-md'>Submit</button>
              <button type='submit' className='bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md' onClick={handleCancelReview}>Cancel</button>
              </div>
             }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
