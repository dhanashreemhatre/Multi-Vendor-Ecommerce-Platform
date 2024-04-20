import React from 'react'
import Image from 'next/image'
import Flower from "../../../Shared/product/Image/Sakura.png";
import styles from './categorycard.module.css'

function page() {
  return (
    <div>
        <div className={styles.box_product}>
                <Image src={Flower} alt="flower-image" priority />
                <h1>Flower</h1>
                <button>Explore Now</button>
        </div>
    </div>
  )
}

export default page