"use client";
import React, { useState ,useEffect} from "react";
import Image from "next/image";
import "./signup.css";
import tick from "./image/Ok.png";
import User from "./image/9334243-removebg-preview 1.png";
import Vendor from "./image/42-removebg-preview 1.png";
import Google from './image/Google.png'
import Link from "next/link";
const Page = () => {
  const [selectedBox, setSelectedBox] = useState(0);

  const handleBoxClick = (boxIndex) => {
    setSelectedBox(boxIndex);
  };


  useEffect(() => {
    localStorage.setItem('selectedBox', selectedBox);
  }, [selectedBox]);

  return (
    <>
      <header>Choose Account Type</header>

      <div className="container">
      <div className="profile">
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
<br />Please Signup out the form to get started</h1>)}
            {selectedBox===1 && (<h1>Hello Vendor!
<br />Please Signup out the form to get started</h1>)}
        </div>
        <div className="form">
          <form>
            <input
              type="email"
              placeholder="Email"
              name="email"
              
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
             
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
             
            />
            <input
              type="password"
              placeholder="Confirm-Password"
              name="confirmpassword"
             
            />
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
        <h1> Already have an account?</h1>
        <Link href="/login">
          <h2>Login</h2>
        </Link>
      </div>
        </div>
      </div>
    </>
  );
};

export default Page;
