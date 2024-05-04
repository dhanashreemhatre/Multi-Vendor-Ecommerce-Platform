"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./signup.css";
import tick from "./image/Ok.png";
import User from "./image/9334243-removebg-preview 1.png";
import Vendor from "./image/42-removebg-preview 1.png";
import Google from './image/Google.png'
import Link from "next/link";

const Page = () => {
  const [selectedBox, setSelectedBox] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    is_vendor: 0, // Default to 0 for "User"
  });

  
  const handleBoxClick = (boxIndex:any) => {
    setSelectedBox(boxIndex);

    // Set is_vendor to 0 for "User" and 1 for "Vendor"
    console.log(boxIndex)
    setFormData({
      ...formData,
      is_vendor: boxIndex === 0 ? 1: 0,
    });
    console.log(formData.is_vendor)
  };

  const handleInputChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e:any) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Password does not match Confirm Password");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/sign-up/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User signed up successfully!");
        // Handle success, e.g., redirect to a success page or show a success message
      } else {
        const errorData = await response.json();
        if (response.status === 400 && errorData.error) {
          alert(errorData.error);
          setShowAlert(true); // Display alert if user already exists
        } else {
          console.error("Failed to sign up:", response.statusText);
          setShowAlert(true);
          // Handle other errors, e.g., show an error message to the user
        }
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedBox", selectedBox);
    let timeoutId: NodeJS.Timeout;

    if (showAlert) {
      timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 2000); // Set timeout for 2 seconds
    }

    return () => clearTimeout(timeoutId);
  }, [selectedBox,showAlert]);

  return (
    <div className="sign-up">
      <header>Choose Account Type</header>

      <div className="container">
        <div className="profile">
          <div className="profile_box">
          <div
  className={`profile_box_user ${
    selectedBox === 0 ? "selected" : ""
  } ${formData.is_vendor === 0 ? "isUser" : "isVendor"}`}
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
  } ${formData.is_vendor === 1 ? "isVendor" : "isUser"}`}
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
          {selectedBox === 0 && (
            <h1>
              Hello User!
              <br />
              Please Signup out the form to get started
            </h1>
          )}
          {selectedBox === 1 && (
            <h1>
              Hello Vendor!
              <br />
              Please Signup out the form to get started
            </h1>
          )}
        </div>
        <div className="form">
        {showAlert && ( 
          <div className="alert warning">
            <p>user already exists</p>
          </div>
        )}
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
           
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
             <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm-Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <button >Sign up</button>
            <div className="google">
            <h1>-or sign in with-</h1>
            <button>
              <Image src={Google} alt="loading-image" />
              <h1>Sign up with google</h1>
            </button>
          </div>
          </form>
          
          <div className="login_to">
            <h1> Already have an account?</h1>
            <Link href="/login">
              <h2>Login</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
