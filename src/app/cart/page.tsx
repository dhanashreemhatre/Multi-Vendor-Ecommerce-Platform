"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './cart.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './../../../Components/Ui/Navbar/page';
import Footer from './../../../Components/Ui/Footer/page';
import Itemalert from '../../../Components/Ui/Alert/alert';
import bin from './Images/trash.png';

interface Product {
  id: number;
  pid: string;
  title: string;
  price: number;
  old_price: number;
  image: string;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalShippingCharges, setTotalShippingCharges] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      const userId = Cookies.get('user');
      const response = await fetch(`https://django-ecom-three.vercel.app/add-to-cart/${itemId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userId}`,
        },
        body: JSON.stringify({
          pid: itemId,
          quantity: newQuantity,
          userId: userId,
        }),
      });

      if (response.ok) {
        fetchCartData();
      } else {
        console.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const increment = (itemId: string, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const decrement = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const fetchCartData = async () => {
    try {
      const userId = Cookies.get('user');
      if (!userId) throw new Error('User ID not found in cookies');

      const response = await fetch(`https://django-ecom-three.vercel.app/cart/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userId}`,
        },
      });

      if (response.ok) {
        const data: CartItem[] = await response.json();
        setCartItems(data);
      } else {
        console.error('Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      setCartTotal(total);
    };
    calculateTotal();
  }, [cartItems]);

  useEffect(() => {
    const calculateTotalShippingCharges = () => {
      const totalCharges = cartItems.reduce((acc, item) => acc + calculateShippingChargesForItem(item), 0);
      setTotalShippingCharges(totalCharges);
    };
    calculateTotalShippingCharges();
  }, [cartItems]);

  const calculateShippingChargesForItem = (item: CartItem) => item.quantity * 5;

  const handleRemoveCartItem = async (cartItemId: number) => {
    try {
      const userId = Cookies.get('user');
      const response = await fetch(`https://django-ecom-three.vercel.app/remove-from-cart/${cartItemId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userId}`,
        },
      });

      if (response.ok) {
        const cartAudio = new Audio('/Sound/item.mp3');
        cartAudio.play();
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
        setCartItems(cartItems.filter((item) => item.id !== cartItemId));
        fetchCartData();
      } else {
        console.error('Failed to remove cart item');
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className={styles.heading_1}>Your Cart</h1>
      <div className="sm:grid grid-cols-2">
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className={`${styles.cart_item} m-4 p-4`}>
              <Image
                src={`https://django-ecom-three.vercel.app/${decodeURIComponent(item.product.image)}`}
                priority
                width={100}
                height={100}
                alt={item.product.title}
              />
              <div className={styles.cart_item_info}>
                <h2>{item.product.title}</h2>
                <h4>
                  ₹{item.product.price} <span>{item.product.old_price}</span>
                </h4>
                <div className="quantity">
                  <button className="text-[24px] mx-2" onClick={() => increment(item.product.pid, item.quantity)}>
                    +
                  </button>
                  {item.quantity}
                  <button className="text-[24px] mx-2" onClick={() => decrement(item.product.pid, item.quantity)}>
                    -
                  </button>
                </div>
                <button onClick={() => handleRemoveCartItem(item.id)}>
                  <Image src={bin} alt="delete" height={28} width={28} />
                </button>
                {showAlert && <Itemalert bullet="Success" message="Item has been removed from Cart" color="#50C878" />}
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.cart_box} m-4 p-4`}>
          <h2>
            Total Shipping Charges: <span>₹{totalShippingCharges}</span>
          </h2>
          <h2>
            Cart Total: <span>₹{cartTotal}</span>
          </h2>
          <button className={styles.checkout_btn}>
            <Link href="/checkout">Checkout</Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
