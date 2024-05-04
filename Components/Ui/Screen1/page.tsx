// page.jsx
import React from "react";
import "./screen1.css";
import Image from "next/image";
import Share from "./image/share-2.png";
import Like from "./image/heart.png";
import star from "./image/icons8-star-48.png";
import Boys from "./image/7309681.jpg";
const Page = () => {
  return (
    <div className="main_screen1">
      <div className="main_screen1_items">
        <div className="icons">
          <div className="share">
            <Image src={Share} alt="Share icon" priority />
            <h2>Share</h2>
          </div>
          <div className="save">
            <Image src={Like} alt="Save icon" priority />
            <h2>Save</h2>
          </div>
        </div>

        <div className="title_product">
          <h1>Beautiful Handmade Duck Toy</h1>
          <h2>100% Pure</h2>
          <div className="review">
            <Image src={star} alt="loading image" priority height={30} />
            <Image src={star} alt="loading image" priority height={30} />
            <h1>200 reviews</h1>
          </div>

          <div className="price_items">
            <div className="price">
              <h1>400 Rs.</h1>
              <h2>Free shipping is available</h2>
            </div>
            <div className="but">
              <button>Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="prod_desc">
          <div className="prod_desc_item">
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
        <div className="customer_review">
          <div className="customer_review_items">
            <h1>Customer Reviews</h1>
            <div className="user_detalis">
              <div className="avtar_user1">
                <Image
                  src={Boys}
                  alt="loading image"
                  height={32}
                  width={32}
                  className="avtar-boys"
                />

                <div className="name">
                  <h1>Satyam</h1>
                  <h2>14-02-2020</h2>
                </div>
              </div>
              <div className="review_main">
                <h1>Nice Product</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis suscipit magnam et quos laborum modi blanditiis enim
                  numquam adipisci deserunt dolores eaque similique voluptatibus
                  nisi earum,
                </p>
              </div>

              <div className="avtar_user1">
                <Image
                  src={Boys}
                  alt="loading image"
                  height={32}
                  width={32}
                  className="avtar-boys"
                />

                <div className="name">
                  <h1>Gauri</h1>
                  <h2>14-02-2020</h2>
                </div>
              </div>
              <div className="review_main">
                <h1>Bad Product</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis suscipit magnam et quos laborum modi blanditiis enim
                  numquam adipisci deserunt dolores eaque similique voluptatibus
                  nisi earum,
                </p>
              </div>
              <div className="buttons_review">
                <div className="box1_button">See All Products</div>
                <div className="box1_button">Add Your Review</div>
              </div>

            
            </div>
            
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Page;
