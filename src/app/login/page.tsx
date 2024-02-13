"use client";
import React, { useState, useEffect } from 'react';
import './login.css';
import Image from 'next/image';
import User from '../Signup/image/9334243-removebg-preview 1.png'
import Vendor from '../Signup/image/42-removebg-preview 1.png'
import Google from './image/Google.png'
import tick from '../Signup/image/Ok.png'
import Link from 'next/link';
const Page = () => {
  const [selectedBox, setSelectedBox] = useState(0);
  const handleBoxClick = (boxIndex) => {
    setSelectedBox(boxIndex);
  };

  useEffect(() => {
    const storedBox = localStorage.getItem('selectedBox');
    if (storedBox !== null) {
      setSelectedBox(parseInt(storedBox, 10));
    }
  }, []);

  return (
    <>
      <div className="login">
        <div className="login_items">
        <div className="profile_box">
          <div
            className={`profile_box_user ${
              selectedBox === 0 ? "selected" : ""
            }`}
            onClick={() => handleBoxClick(0)}
          >
            {selectedBox === 0 && (
              <Image src={tick} alt="Tick" className="tick" />
            )}
            <Image src={User} alt="User" />
            <h1>User</h1>
          </div>
          <div
            className={`profile_box_user ${
              selectedBox === 1 ? "selected" : ""
            }`}
            onClick={() => handleBoxClick(1)}
          >
            {selectedBox === 1 && (
              <Image src={tick} alt="Tick" className="tick" />
            )}
            <Image src={Vendor} alt="Vendor" />
            <h1>Vendor</h1>
          </div>
        </div>
          
        </div>
        <div className="profile_title">
           {selectedBox===0 && (<h1>Hello User!
<br />Please Login out the form to get started</h1>)}
            {selectedBox===1 && (<h1>Hello Vendor!
<br />Please Login out the form to get started</h1>)}
           </div>
           <form action="">
              <input type="email" placeholder='Email' />
              <input type="password" placeholder='Password' />

              <button >
              Sign up
            </button>
           </form>
           <div className="google">
            <h1>-or sign in with-</h1>
            <button>
              <Image src={Google} alt="loading-image" />
              <h1>Sign up with google</h1>
            </button>
          </div>
          <div className="login_to">
        <h1> Do Not have an account?</h1>
        <Link href="/Signup">
          <h2>Sign Up</h2>
        </Link>
      </div>
      </div>
    </>
  );
};

export default Page;
