"use client";
import React, { useEffect, useState } from "react";
import ProductCardGrid from './../../Ui/Product/ProductCardGrid/page';
import ProductCard from './../../Ui/Product/ProductCard/page';
import "./product.css";
import Categorygrid from './../../Ui/Category/Categorygrid/page';
import "./slider.css";
import "./swiper-bundle.min.css";
import Script from "next/script";
import Navbar from "../../Ui/Navbar/page";
import Image from "next/image";
import store from "./Image/Procurement.png";
import delivery from "./Image/Deliver Food.png";
import customer from "./Image/Customer Support.png";
import Plate from "./Image/plate.png";
import Swiper from "swiper";
import Footer from './../../Ui/Footer/page';
import { useRouter } from 'next/navigation';
import Experience from '../../Ui/Experience/page';
import Product from '../../Ui/Light/page'; // Ensure correct path
import cart from "./Image/cart.svg";

interface ProductDetails {
  pid: string;
  image: string;
  name: string;
  price: number;
  discountedPrice: number;
  old_price: number;
  title: string;
}

interface Light {
  position: [number, number, number]; // Fixed-length array
  intensity: number;
  color: string;
}

const Page = () => {
  const router = useRouter();

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
  const [lights, setLights] = useState<Light[]>([
    { position: [10, 10, 5] as [number, number, number], intensity: 6, color: 'yellow' },
    { position: [5, 5, 5] as [number, number, number], intensity: 10, color: 'green' },
    { position: [0, 0, 0] as [number, number, number], intensity: 10, color: 'red' },
  ]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch("https://django-ecom-three.vercel.app/products/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setProductDetails(data.map((product: any) => ({
          pid: product.pid,
          image: product.image,
          name: product.name,
          price: product.price,
          discountedPrice: product.discountedPrice,
          old_price: product.old_price,
          title: product.title,
        })));
      } catch (error: any) {
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
          <Navbar />
        </div>
        <div className="product_details">
          <div className="content_product">
            <h2 className="hero-heading font-bold mt-10">Unveiling the Future: iPhone 14 Launch!,Coming Soon....</h2>
            <div className="flex flex-col space-y-2">
              <Product onChangeLight={setLights} />
              <Experience lights={lights} />
            </div>
          </div>
        </div>
        <div className="service_product">
          <div className="service_product_items">
            <div className="stores_product">
              <Image src={store} alt="store-image" priority />
              <h1>15+ Stores</h1>
              <p>
                Explore a variety of premium products across our diverse multi stores
              </p>
            </div>
            <div className="stores_product">
              <Image src={delivery} alt="delivery-image" priority />
              <h1>Fast Delivery</h1>
              <p>
                Elevate your experience with lightening fast inclusify product delivery
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
          <Categorygrid />
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
                      {productDetails.map((product: any, index: any) => (
                        <div className="swiper-slide" key={index}>
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
                  <ProductCardGrid />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Page;
