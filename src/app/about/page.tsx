"use client"
import React,{useEffect,useState} from 'react'
import ProductCardGrid from './../../../Components/Ui/Product/ProductCardGrid/page';
import Navbar from './../../../Components/Ui/Navbar/page'
import Footer from './../../../Components/Ui/Footer/page'
  
function page() {
   
  return (
    <div>
        <Navbar/>
            <p className='my-20 text-center'>This is about our Shopping platform</p>
        <Footer/>
    </div>
  )
}

export default page