"use client";
import React, { useEffect, useState } from "react";
import "./product.css";
import Cream from "./Image/cream.png";
import nature from "./Image/natur.png";
import cap from "./Image/cap.png";

import "./slider.css";
import "./swiper-bundle.min.css";
import Script from "next/script";
import Navbar from "../../Ui/Navbar/page";
import ProductOil from "./Image/Screenshot_2023-12-30_153910-removebg-preview 1.png";
import Image from "next/image";
import store from "./Image/Procurement.png";
import delivery from "./Image/Deliver Food.png";
import customer from "./Image/Customer Support.png";
import Flower from "./Image/Sakura.png";
import Pills from "./Image/Pills.png";
import Oils from "./Image/Sesame Oil.png";
import Seeds from "./Image/Basil.png";
import Earbuds from "./Image/Earbud Headphones.png";
import Pizza from "./Image/Pizza Five Eighths.png";
import Plate from "./Image/plate.png";
import Swiper from "swiper";
import arrival from "./Image/soonarival.jpg";
import star from "./Image/⭐⭐⭐⭐⭐.png";
import location from "./Image/Group 82.png";
import phone from "./Image/Phone.png";
import Facebook from "./Image/facebook.png";
import Instagram from "./Image/instagram.png";
import Twitter from "./Image/twitter.png";
import Youtube from "./Image/youtube.png";
import Link from "next/link";
import { useRouter } from 'next/navigation';
interface ProductDetails {
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
        setProductDetails(data.map((product) => ({
          image: product.image,
          name: product.name,
          price: product.price,
          discountedPrice: product.discountedPrice,
          old_price: product.old_price,
          title: product.title,
        })));
  
      } catch (error) {
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
          <div className="product_sale">
            <h1>
           
              Shop 35% on your first <u>shop now</u>
            </h1>
            {userEmail && <h1>Welcome to the Product Page, {userEmail}!</h1>}
      {/* The rest of your product page content */}
            <div className="divider"></div>
            <div className="navbar_product">
              <Navbar />
            </div>
          </div>
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
          <div className="categories_product_items">
            <div className="categories_heading">
              <h1>Classification</h1>
              <p>Shop By Categories</p>
            </div>
            <div className="categories_items1">
              <div className="box_product">
                <Image src={Flower} alt="flower-image" priority />
                <h1>Flower</h1>
                <button>Explore Now</button>
              </div>
              <div className="box_product">
                <Image src={Pills} alt="pills-image" priority />
                <h1>Pills</h1>
                <button>Explore Now</button>
              </div>
              <div className="box_product">
                <Image src={Oils} alt="oil-image" priority />
                <h1>Oils</h1>
                <button>Explore Now</button>
              </div>
            </div>
            <div className="categories_items2">
              <div className="box_product">
                <Image src={Seeds} alt="seed-image" priority />
                <h1>Seeds</h1>
                <button>Explore Now</button>
              </div>
              <div className="box_product">
                <Image src={Earbuds} alt="buds-image" priority />
                <h1>Buds</h1>
                <button>Explore Now</button>
              </div>
              <div className="box_product">
                <Image src={Pizza} alt="pizza-image" priority />
                <h1>Foods</h1>
                <button>Explore Now</button>
              </div>
            </div>
          </div>
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
              <div className="swiper-slide" key={index}>
                <div className="product-box">
                  <span className="product-box-offer">-20%</span>
                  <div className="product-img-container">
                    <div className="product-img">
                      <a href={`http://demo47.askas8.se/sv/${product.slug}`}>
                      <Image
  alt="loading-image"
  className="product-img-front"
  src={`http://127.0.0.1:8000${decodeURIComponent(product?.image) || ""}`}
  width={800}
  height={800}
  priority
/>
                      </a>
                    </div>
                  </div>
                  <div className="product-box-text">
                    <div className="product-category">
                      <span>{product.title}</span>
                    </div>
                    <a
                      href={`http://demo47.askas8.se/sv/${product.slug}`}
                      className="product-title"
                    >
                      {product.description}
                    </a>
                    <div className="price-buy">
                      <span className="p-price">${product.price}</span>
                      <a
                        href={`http://demo47.askas8.se/sv/${product.slug}`}
                        className="p-buy-btn"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
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
                  <div className="sale_box1" >
                  {productDetails && productDetails.slice(0, 3).map((product:any, index:any) => (
  <div className="sale_box_items" key={index}>
    {product && (
      <>
        <Image
          alt="loading-image"
          className="product-img-front"
          src={`http://127.0.0.1:8000${decodeURIComponent(product?.image) || ""}`}
          priority
          width={800}
          height={800}
        />
       <Link href="/Items"><h1>{product.title || "Loading..."}</h1></Link> 
        <p>
          ${product.price || 0} <span>${product.old_price || 0}</span>
        </p>
      </>
    )}
  </div>
))}
                      
                  </div>
                  <div className="sale_box1">
                  {productDetails && productDetails.slice(3, 6).map((product:any, index:any) => (
  <div className="sale_box_items" key={index}>
    {product && (
      <>
        <Image
          alt="loading-image"
          className="product-img-front"
          src={`http://127.0.0.1:8000${decodeURIComponent(product?.image) || ""}`}
          priority
          width={800}
          height={800}
        />
       <Link href="/Items"><h1>{product.title || "Loading..."}</h1></Link> 
        <p>
          ${product.price || 0} <span>${product.old_price || 0}</span>
        </p>
      </>
    )}
  </div>
))}
                  </div>
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
        <div className="footer_product">
          <div className="footer_product_items">
            <div className="logo_product">
              <h1>INCLUSIFY</h1>
            </div>
            <div className="contact_product">
              <div className="location">
                <Image src={location} alt="loading-image" />
                <div className="location_heading">
                  <h1>Address</h1>
                  <p>Sector 21,Mumbai</p>
                </div>
              </div>
              <div className="location">
                <Image src={phone} alt="loading-image" />
                <div className="location_heading">
                  <h1>Phone</h1>
                  <p>9877578777</p>
                </div>
              </div>
            </div>
            <div className="social_media">
              <Image src={Facebook} alt="loading-image" priority />
              <Image src={Instagram} alt="loading-image" priority />
              <Image src={Twitter} alt="loading-image" priority />
              <Image src={Youtube} alt="loading-image" priority />
            </div>
            <div className="divider_product"></div>
            <div className="links_product">
              <h1>Quick Links</h1>
              <div className="main_links">
                <div className="main_links1">
                  <li>Home</li>
                  <li>Categories</li>
                  <li>About</li>
                  <li>Blog</li>
                </div>
                <div className="main_links1">
                  <li>Articles</li>
                  <li>Feedback</li>
                  <li>Contact</li>
                  <li>FAQ</li>
                </div>
              </div>
            </div>
            <div className="links_photos">
              <h1>Recent Photos</h1>
              <div className="photos_sale">
                <Image
                  src={Cream}
                  alt="loadin-image"
                  priority
                  className="photos_sale1"
                />
                <Image
                  src={nature}
                  alt="loadin-image"
                  priority
                  className="photos_sale1"
                />
                <Image
                  src={cap}
                  alt="loadin-image"
                  priority
                  className="photos_sale1"
                />
              </div>
            </div>
          </div>
          <div className="links_photos">
            <h1>Subscribe</h1>
            <p>Stay in touch with us</p>
            <div className="message_product">
              <form action="/product" method="post">
                <input type="email" placeholder="Email" />
                <button type="submit" className="button_product">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="copyright_product">
          <h1>© copyright inclusify All right reserved.</h1>
        </div>
      </section>
    </>
  );
};

export default page;
