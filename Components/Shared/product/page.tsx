"use client";
import React, { useEffect, useState } from "react";
import ProductCardGrid from './../../Ui/Product/ProductCardGrid/page'
import ProductCard from './../../Ui/Product/ProductCard/page'
import "./product.css";
import nature from "./Image/natur.png";
import Categorygrid from './../../Ui/Category/Categorygrid/page'
import "./slider.css";
import "./swiper-bundle.min.css";
import Script from "next/script";
import Navbar from "../../Ui/Navbar/page";
import ProductOil from "./Image/Screenshot_2023-12-30_153910-removebg-preview 1.png";
import Image from "next/image";
import store from "./Image/Procurement.png";
import delivery from "./Image/Deliver Food.png";
import customer from "./Image/Customer Support.png";
import Plate from "./Image/plate.png";
import Swiper from "swiper";
import arrival from "./Image/soonarival.jpg";
import star from "./Image/⭐⭐⭐⭐⭐.png";
import Link from "next/link";
import Footer from './../../Ui/Footer/page'
import { useRouter } from 'next/navigation';
import { pid } from "process";
interface ProductDetails {
  pid:string;
  image: string;
  name: string;
  price: number;
  discountedPrice: number;
  old_price: number;
  title: String;
}



const page = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    // Retrieve user's email from local storage
    const storedEmail = localStorage.getItem('userEmail');
    setUserEmail(storedEmail || '');

    // If the user is not logged in, redirect to the login page
    if (!storedEmail) {
      router.push('/login'); // Adjust the actual login page path
    }
  }, [router]);
  useEffect(() => {
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        360: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        540: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }, []);
  
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);
  const generateImageUrl = (imagePath: any, width = 800) => {
    return `/your-image-api?path=${encodeURIComponent(imagePath)}&w=${width}`;
  };
  const imageUrl = generateImageUrl(productDetails?.image);
  console.log(imageUrl);
  

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/products/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
  
        console.log("API Response:", data);
  
        // Assuming the API response is an array of products
        setProductDetails(data.map((product:any) => ({
          pid:product.pid,
          image: product.image,
          name: product.name,
          price: product.price,
          discountedPrice: product.discountedPrice,
          old_price: product.old_price,
          title: product.title,
        })));
  
      } catch (error:any) {
        console.error("Error fetching product details:", error.message);
      }
    };
  
    fetchProductDetails();
  }, []);

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></Script>

      <section className="product">
        <div className="product_items">
        <Navbar/>
        </div>
        <div className="product_details">
          <div className="content_product">
            <h1>Pure and Potent Inclusify Creation</h1>
            <button>Explore Now</button>
            <Image
              src={ProductOil}
              alt="oil-image"
              className="oil_image"
              priority
            />
          </div>
        </div>
        <div className="service_product">
          <div className="service_product_items">
            <div className="stores_product">
              <Image src={store} alt="store-image" priority />
              <h1>15+ Stores</h1>
              <p>
                Explore a variety of premium products across our diverse multi
                stores
              </p>
            </div>
            <div className="stores_product">
              <Image src={delivery} alt="delivery-image" priority />
              <h1>Fast Delivery</h1>
              <p>
                Elevate your experience with lightening fast inclusify product
                delivery
              </p>
            </div>
            <div className="stores_product">
              <Image src={customer} alt="customer-image" priority />
              <h1>Support</h1>
              <p>
                Your satisfaction is our priority.Contact us anytime Contact Us
              </p>
            </div>
          </div>
        </div>
        <div className="categories_product">
            <Categorygrid/>  
        </div>
        <div className="main_content_product">
          <div className="main_content_product_items">
            <div className="despensary">
              <Image src={Plate} alt="plate-image" priority />
              <div className="heading_despensary">
                <h1>About Our Despensary-</h1>
                <p>
                  Crafting Products with the Talents of{" "}
                  <span>Underprivileged</span> Artisans Nationwide
                </p>
                <h2>
                  From Artisans to Your Doorstep — Our Unique Products,
                  Nationwide.
                </h2>
                <div className="buttons">
                  <button>MORE PRODUCT</button>
                  <button>MORE INFO</button>
                </div>
              </div>
            </div>
            <div className="best_product">
              <div className="subheading">
                <h1>OUR BEST SELLERS</h1>
                <h2>Our Best Products</h2>
              </div>
              <section className="product-slider">
                <div className="slider-btns">
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>
                </div>
                <div className="slider-container">
                  <div className="swiper mySwiper">
                    <div className="swiper-wrapper">
                      {productDetails.map((product:any, index:any) => (
                        <div className="swiper-slide">
                          <ProductCard
                        key={product.pid}
                        pid={product.pid}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        oldPrice={product.old_price}
                      />
                      
                  
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
             </section>
              <div className="sale_items">
                <div className="subheading">
                  <h1>OUR BEST SELLERS</h1>
                  <h2>Our Popular Products</h2>
                </div>
                <div className="sale_box">
                 <ProductCardGrid/>
                </div>
              </div>
              <div className="arrival_product">
                <div className="arrival_product_items">
                  <div className="subheading">
                    <h1>OUR New Product</h1>
                    <h2>New Arrivals</h2>
                  </div>
                  <div className="soon_arival">
                    <div className="soon_arival_oil">
                      <Image
                        src={arrival}
                        alt="loading-image"
                        className="arrival"
                      />
                      <div className="dealOfDayText">
                        <p>Deal of the Day</p>
                        <h3>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Cupiditate, autem.
                        </h3>
                        <button>Buy now</button>
                      </div>
                    </div>
                    <div className="arival_subheading">
                      <div className="box">
                        <div className="item1">
                          <Image
                            src={nature}
                            alt="loadin-image"
                            className="nature"
                          />
                          <h1>Canibiz active oil</h1>
                          <p>PRICE $32</p>
                          <Image
                            src={star}
                            alt="losding-image"
                            className="star"
                          />
                        </div>
                        <div className="item1">
                          <Image
                            src={nature}
                            alt="loadin-image"
                            className="nature"
                          />
                          <h1>Canibiz active oil</h1>
                          <p>PRICE $32</p>
                          <Image
                            src={star}
                            alt="losding-image"
                            className="star"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </section>
    </>
  );
};

export default page;
