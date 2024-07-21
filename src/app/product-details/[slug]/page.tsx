"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Navbar from './../../../../Components/Ui/Navbar/page';
import Footer from './../../../../Components/Ui/Footer/page';
import styles from './product-details.module.css';
import Image from "next/image";
import Share from "./image/share-2.png";
import star from "./image/icons8-star-48.png";
import Boys from "./image/7309681.jpg";
import Link from 'next/link';
import CartButton from '../../../../Components/Ui/Product/AddToCartButton/page';
import ReactImageMagnify from 'react-image-magnify';
import { WhatsappShareButton } from 'react-share';

function Page() {
  const pathname = usePathname();
  const pid = pathname.split("/").pop();
  const [productDetails, setProductDetails] = useState(null);
  const [reviewPopup, setReviewPopup] = useState(false);
  const [review, setReview] = useState({ subject: '', review: '', rating: '' });
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://django-ecom-three.vercel.app/products/${pid}/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductDetails(data);
        // Set the initial selected image to the main product image
        if (data.product && data.product.image) {
          setSelectedImage(data.product.image);
        }
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProductDetails();
  }, [pid]);

  const handleAddReview = (e) => {
    e.preventDefault();
    setReviewPopup(true);
  };

  const handleCancelReview = (e) => {
    e.preventDefault();
    setReviewPopup(false);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!review.subject || !review.review) {
      setError('Both subject and review are required.');
      return;
    }

    try {
      const storedEmail = localStorage.getItem('userEmail');
      const response = await fetch(`https://django-ecom-three.vercel.app/review/${productDetails?.product.pid}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid: `${productDetails?.product.pid}`,
          email: storedEmail,
          review: review.review,
          subject: review.subject,
          // rating: review.rating
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const newReview = await response.json();
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        review: [...prevDetails.review, newReview]
      }));

      setReviewPopup(false);
      setReview({ subject: '', review: '' });
      setError('');
    } catch (error) {
      console.error('Error while adding Review: ', error.message);
      setError('Failed to submit review. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleThumbnailClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.product_details}>
        <div className={styles.product_image}>
          {selectedImage ? (
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'Product image',
                isFluidWidth: true,
                src: `https://django-ecom-three.vercel.app${decodeURIComponent(selectedImage)}`
              },
              largeImage: {
                src: `https://django-ecom-three.vercel.app${decodeURIComponent(selectedImage)}`,
                width: 1200,
                height: 1800
              },
              enlargedImageContainerDimensions: {
                width: '200%',
                height: '200%'
              }
            }} />
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div className={styles.product_info}>
          <div className={styles.title_product}>
            <h1>{productDetails?.product.title || "Loading..."}</h1>
            <div className={styles.review}>
              <Image src={star} alt="loading image" priority height={24} />
              <Image src={star} alt="loading image" priority height={24} />
              <h1>(200 reviews)</h1>
            </div>
            <p>{productDetails?.product.description || "Loading..."}</p>

            <div className={styles.price_items}>
              <div className={styles.price}>
                <h1>{productDetails ? `${productDetails.product.price} Rs.` : "Loading..."}</h1>
                <h2>Free shipping is available</h2>
              </div>
              <div className={styles.cart}>
                <CartButton pid={pid} />
              </div>
            </div>
          </div>
          <div className={styles.icons}>
            <div className={styles.share}>
              <Image src={Share} alt="Share icon" priority />
              <WhatsappShareButton url='http://localhost:3000/product-details/24fhgbe5ef'>
                <h2>Share</h2>
              </WhatsappShareButton>
            </div>
          </div>
          <div className={styles.product_list_images}>
            {productDetails && productDetails.product && productDetails.product.product_images.length > 0 ? (
              productDetails.product.product_images.map((imageObj, index) => (
                <div key={index} onClick={() => handleThumbnailClick(imageObj.images)} className={styles.thumbnail}>
                  <Image
                    src={`https://django-ecom-three.vercel.app${decodeURIComponent(imageObj.images)}`}
                    alt={`Product image ${index + 1}`}
                    className={styles.product_image_item}
                    width={40}
                    height={40}
                  />
                </div>
              ))
            ) : (
              <p>No additional images available</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.prod_desc}>
        <div className={styles.prod_desc_item}>
          <h1>Description</h1>
          <p>{productDetails?.product.short_description || "Loading.."}</p>
          <h1>Specifications</h1>
          <p>{productDetails?.product.specification || "Loading..."}</p>
        </div>
      </div>
      <div className={styles.customer_review}>
        <div className={styles.customer_review_items}>
          <h1>Customer Reviews</h1>
          <div className={styles.user_details}>
            {productDetails?.review.length > 0 ? (
              productDetails.review.map((review, index) => (
                <div key={index}>
                  <div className={styles.avatar_user}>
                    <Image
                      src={Boys}
                      alt="loading image"
                      height={32}
                      width={32}
                      className={styles.avatar_boys}
                    />
                    <div className={styles.name}>
                      <h1>Gauri</h1>
                      <h2>{new Date(review.created_date).toLocaleDateString()}</h2>
                    </div>
                    <div className={styles.review_main}>
                      <h1>{review.subject}</h1>
                      <p>{review.review}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Reviews Yet.</p>
            )}

            <div className={styles.buttons_review}>
              <div className={styles.box1_button}><Link href="/products">See All Products</Link></div>
              {!reviewPopup && (
                <div className={styles.box1_button} onClick={handleAddReview}>Add Your Review</div>
              )}

              {reviewPopup && (
                <div className='flex flex-col gap-4 md:w-[50%] md:mx-auto '>
                  <h3 className='text-lg font-semibold mt-4'>Share your reviews</h3>
                  <form name='reviewForm' onSubmit={handleReviewSubmit} className='flex flex-col gap-4'>
                    <input type='text' name="subject" placeholder='Subject' className='px-4 py-2 border rounded-md w-100' onChange={handleChange} value={review.subject} />
                    <textarea rows={6} name='review' placeholder='Review' className='px-4 py-2 border rounded-md w-100' onChange={handleChange} value={review.review} />
                    <button type='submit' className='bg-slate-600 hover:bg-slate-800 text-white px-4 py-2 rounded-md'>Submit</button>
                    <button type='button' className='bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md' onClick={handleCancelReview}>Cancel</button>
                  </form>
                  {error && <p className='text-red-600'>{error}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
