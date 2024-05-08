"use client"
import React,{useEffect,useState} from 'react'
import Navbar from './../../../../Components/Ui/Navbar/page';
import Footer from './../../../../Components/Ui/Footer/page';
import styles from './product-details.module.css'
import Image from "next/image";
import Share from "./image/share-2.png";
import Like from "./image/heart.png";
import star from "./image/icons8-star-48.png";
import Boys from "./image/7309681.jpg";
import SampleProduct from './../../../../Components/Shared/product/Image/soonarival.jpg'

function page() {
  return (
    <div>
        <Navbar/>
        <div className={styles.product_details}>
            <div className={styles.product_image}>
            <Image src={SampleProduct} alt='Product-Image' height={100} width={100} className={styles.image}/>
            </div>
            <div className={styles.product_info}>
                <div className={styles.title_product}>
                <h1>Beautiful Handmade Duck Toy</h1>
                <h2>100% Pure</h2>
                <div className={styles.review}>
                    <Image src={star} alt="loading image" priority height={30} />
                    <Image src={star} alt="loading image" priority height={30} />
                    <h1>200 reviews</h1>
                </div>

                <div className={styles.price_items}>
                    <div className={styles.price}>
                    <h1>400 Rs.</h1>
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
        <Footer/>
    </div>
  )
}

export default page