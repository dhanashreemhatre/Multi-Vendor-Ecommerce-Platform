import React from 'react'
import Image from 'next/image'
import styles from './footer.module.css'
import location from "./../../Shared/product/Image/Group 82.png";
import phone from "./../../Shared/product/Image/Phone.png";
import Facebook from "./../../Shared/product/Image/facebook.png";
import Instagram from "./../../Shared/product/Image/instagram.png";
import Twitter from "./../../Shared/product/Image/twitter.png";
import Youtube from "./../../Shared/product/Image/youtube.png";
import cap from "./../../Shared/product/Image/cap.png";
import Cream from "./../../Shared/product/Image/cream.png";
import nature from "./../../Shared/product/Image/natur.png";

function page() {
  return (
    <>
        <div className={styles.footer_product}>
          <div className={styles.footer_product_items}>
            <div className={styles.logo_product}>
              <h1>INCLUSIFY</h1>
            </div>
            <div className={styles.contact_product}>
              <div className={styles.location}>
                <Image src={location} alt="loading-image" />
                <div className={styles.location_heading}>
                  <h1>Address</h1>
                  <p>Sector 21,Mumbai</p>
                </div>
              </div>
              <div className={styles.location}>
                <Image src={phone} alt="loading-image" />
                <div className={styles.location_heading}>
                  <h1>Phone</h1>
                  <p>9877578777</p>
                </div>
              </div>
            </div>
            <div className={styles.social_media}>
              <Image src={Facebook} alt="loading-image" priority />
              <Image src={Instagram} alt="loading-image" priority />
              <Image src={Twitter} alt="loading-image" priority />
              <Image src={Youtube} alt="loading-image" priority />
            </div>
            <div className={styles.divider_product}></div>
            <div className={styles.links_product}>
              <h1>Quick Links</h1>
              <div className={styles.main_links}>
                <div className={styles.main_links1}>
                  <li>Home</li>
                  <li>Categories</li>
                  <li>About</li>
                  <li>Blog</li>
                </div>
                <div className={styles.main_links1}>
                  <li>Articles</li>
                  <li>Feedback</li>
                  <li>Contact</li>
                  <li>FAQ</li>
                </div>
              </div>
            </div>
            <div className={styles.links_photos}>
              <h1>Recent Photos</h1>
              <div className={styles.photos_sale}>
                <Image
                  src={Cream}
                  alt="loadin-image"
                  priority
                  className={styles.photos_sale1}
                />
                <Image
                  src={nature}
                  alt="loadin-image"
                  priority
                  className={styles.photos_sale1}
                />
                <Image
                  src={cap}
                  alt="loadin-image"
                  priority
                  className={styles.photos_sale1}
                />
              </div>
            </div>
          </div>
          <div className={styles.links_photos}>
            <h1>Subscribe</h1>
            <p>Stay in touch with us</p>
            <div className={styles.message_product}>
              <form action="/product" method="post">
                <input type="email" placeholder="Email" />
                <button type="submit" className={styles.button_product}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.copyright_product}>
          <h1>© copyright inclusify All right reserved.</h1>
        </div>
    </>
  )
}

export default page