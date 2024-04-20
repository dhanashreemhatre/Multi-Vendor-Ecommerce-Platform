import React from 'react'
import CategoryCard from '../CategoryCard/page'
import styles from './categorygrid.module.css'

function page() {
  return (

    <div className={styles.categories_product_items}>
        <div className={styles.categories_heading}>
            <h1>Classification</h1>
            <p>Shop By Categories</p>
        </div>
        <div className={styles.categories_items1}>
            <CategoryCard/>
            <CategoryCard/>
            <CategoryCard/>
            <CategoryCard/>
        </div>
        
    </div>
  )
}

export default page