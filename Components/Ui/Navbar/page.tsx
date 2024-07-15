import React, { useEffect, useState } from 'react';
import './navbar.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
interface PageProps {
  className?: string;
}

const Page: React.FC<PageProps> = ({ className }) => {
  const [userName, setUserName] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    setUserName(storedName || '');
  });

  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const storedEmail = localStorage.getItem('userEmail');
        const storedName = localStorage.getItem('userName');
        if (storedEmail) {
        if (storedName) {
          const response = await fetch(`https://django-ecom-three.vercel.app/cart_count/${storedName}/`);
          if (response.ok) {
            const data = await response.json();
            setCartItemCount(data.cart_items_count);
          } else {
            console.error('Failed to fetch cart items count');
          }
        }
      } }
      catch (error) {
        console.error('Error fetching cart items count:', error);
      }
    };

    fetchCartItemCount();
    const interval = setInterval(fetchCartItemCount, 5000); // Polling every 5 seconds
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      sidebarClose = document.querySelector(".sidebarClose");

    let getMode = localStorage.getItem("mode");
    if (getMode && getMode === "dark-mode" && body) {
      body.classList.add("dark");
    }

    modeToggle?.addEventListener("click", () => {
      modeToggle.classList.toggle("active");
      body?.classList.toggle("dark");
      if (body && !body.classList.contains("dark")) {
        localStorage.setItem("mode", "light-mode");
      } else if (body) {
        localStorage.setItem("mode", "dark-mode");
      }
    });

    searchToggle?.addEventListener("click", () => {
      searchToggle.classList.toggle("active");
    });

    sidebarOpen?.addEventListener("click", () => {
      nav?.classList.add("active");
    });
    body?.addEventListener("click", (e) => {
      let clickedElm = e.target as HTMLElement;
      if (
        !clickedElm.classList.contains("sidebarOpen") &&
        !clickedElm.classList.contains("menu") &&
        nav
      ) {
        nav.classList.remove("active");
      }
    });
  }, []);

  const Cartopen=()=>{
    router.push('/cart')
  }

  return (
    <>
      <div className="product_sale">
        <h1>
          Shop 35% on your first <u>shop now</u>
        </h1>
        {userName && <h1>Welcome to the Product Page, {userName}!</h1>}
        <div className="divider"></div>
        <div className="navbar_product">
          <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet' />
          <nav>
            <div className="nav-bar">
              <i className='bx bx-menu sidebarOpen'></i>

              <button type="button" className="custom-button" onClick={Cartopen}>
                <svg className="custom-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="Cart" viewBox="0 0 52 52" width="60" height="60">
                  <path d="m43.51 32.165 6.44-19.17a1 1 0 0 0-.14-.9.986.986 0 0 0-.81-.41H12.74l-1.29-5.21c-.47-1.66-2-2.82-3.72-2.82H3c-.55 0-1 .44-1 1 0 .55.45 1 1 1h4.73c.83 0 1.57.56 1.78 1.33l7.99 32.18a4.696 4.696 0 0 0-3.32 4.49c0 2.58 2.1 4.69 4.69 4.69 2.58 0 4.68-2.11 4.68-4.69 0-1-.31-1.93-.84-2.69h15.88c-.54.76-.85 1.69-.85 2.69 0 2.58 2.1 4.69 4.68 4.69 2.59 0 4.69-2.11 4.69-4.69 0-2.59-2.1-4.69-4.69-4.69-.04 0-.09 0-.13.01-.02-.01-.04-.01-.06-.01H19.51l-1.52-6.11h24.57c.43 0 .81-.28.95-.69z" fill="#34a853" className="svgShape"></path>
                </svg>
                <span className="sr-only">Notifications</span>
                <div className="notification-badge">{cartItemCount}</div>
              </button>

              <div className="logo-footer">
                <h1>INCLUSIFY</h1>
              </div>
              <div className="menu">
                <div className="logo-toggle">
                  <div className="logo-footer">
                    <h1>INCLUSIFY</h1>
                  </div>
                  <i className='bx bx-x sidebarClose'></i>
                </div>
                <ul className="nav-links">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About</Link></li>
                 
                  <li><Link href="/products">All Products</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/Signup">Register</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Page;
