"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Google from './image/Google.png';
import Link from 'next/link';
import User from '../Signup/image/9334243-removebg-preview 1.png'
import Vendor from '../Signup/image/42-removebg-preview 1.png'
import './login.css'
import { useRouter } from 'next/navigation';
const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedBox, setSelectedBox] = useState(0);

  const handleBoxClick = (boxIndex) => {
    setSelectedBox(boxIndex);
  };

  const handleLogin = async () => {
    try {
      // Make sure to replace 'YOUR_API_ENDPOINT' with the actual backend API endpoint for login
      const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        localStorage.setItem('userEmail', email);
        router.push('/');
        console.log('Login successful');
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <div className="login">
        <div className="login_items">
          <div className="profile_box">
            <div
              className={`profile_box_user ${
                selectedBox === 0 ? 'selected' : ''
              }`}
              onClick={() => handleBoxClick(0)}
            >
              <Image src={User} alt="User" />
              <h1>User</h1>
            </div>
            <div
              className={`profile_box_user ${
                selectedBox === 1 ? 'selected' : ''
              }`}
              onClick={() => handleBoxClick(1)}
            >
              <Image src={Vendor} alt="Vendor" />
              <h1>Vendor</h1>
            </div>
          </div>
        </div>
        <div className="profile_title">
          {selectedBox === 0 && (
            <h1>
              Hello User!
              <br />Please Login to get started
            </h1>
          )}
          {selectedBox === 1 && (
            <h1>
              Hello Vendor!
              <br />Please Login to get started
            </h1>
          )}
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button >Sign in</button>
          <div className="google">
          <span>-or sign in with-</span>
          <button>
            <Image src={Google} alt="loading-image" height={28} width={28} />
            <h1>Sign in with Google</h1>
          </button>
        </div>
        </form>
        
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
