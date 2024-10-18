"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Navbar from "../../../../Components/Ui/Navbar/page";
import Footer from "../../../../Components/Ui/Footer/page";
import styles from "./product-details.module.css";
import Image from "next/image";
import Share from "./image/share-2.png";
import star from "./image/icons8-star-48.png";
import Boys from "./image/7309681.jpg";
import Link from "next/link";
import CartButton from "../../../../Components/Ui/Product/AddToCartButton/page";
import ReactImageMagnify from "react-image-magnify";
import { WhatsappShareButton } from "react-share";

// Types for product details and reviews
interface ProductImage {
  images: string;
}

interface Product {
  pid: string;
  title: string;
  description: string;
  short_description: string;
  specification: string;
  price: number;
  image: string;
  product_images: ProductImage[];
}

interface Review {
  subject: string;
  review: string;
  created_date: string;
}

interface ProductDetails {
  product: Product;
  review: Review[];
}

// Component
const ProductDetailsPage: React.FC = () => {
  const pathname = usePathname();
  const pid = pathname.split("/").pop();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [reviewPopup, setReviewPopup] = useState(false);
  const [review, setReview] = useState<Review>({
    subject: "",
    review: "",
    created_date: "",
  });
  const [error, setError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://django-ecom-three.vercel.app/products/${pid}/`);
        if (!response.ok) throw new Error("Failed to fetch product details");

        const data: ProductDetails = await response.json();
        setProductDetails(data);
        if (data.product.image) setSelectedImage(data.product.image);
      } catch (error) {
        console.error("Error fetching product details:", (error as Error).message);
      }
    };

    fetchProductDetails();
  }, [pid]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleAddReview: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setReviewPopup(true);
  };

  const handleCancelReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReviewPopup(false);
  };

  const handleReviewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!review.subject || !review.review) {
      setError("Both subject and review are required.");
      return;
    }

    try {
      const storedEmail = localStorage.getItem("userEmail");
      const response = await fetch(
        `https://django-ecom-three.vercel.app/review/${productDetails?.product.pid}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pid: productDetails?.product.pid,
            email: storedEmail,
            review: review.review,
            subject: review.subject,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit review");

      const newReview = await response.json();
      setProductDetails((prevDetails) => ({
        ...prevDetails!,
        review: [...prevDetails!.review, newReview],
      }));
      setReviewPopup(false);
      setReview({ subject: "", review: "", created_date: "" });
      setError("");
    } catch (error) {
      console.error("Error submitting review:", (error as Error).message);
      setError("Failed to submit review. Please try again.");
    }
  };

  const handleThumbnailClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.product_details}>
        <div className={styles.product_image}>
          {selectedImage ? (
            <ReactImageMagnify
              smallImage={{
                alt: "Product image",
                isFluidWidth: true,
                src: `https://django-ecom-three.vercel.app${decodeURIComponent(selectedImage)}`,
              }}
              largeImage={{
                src: `https://django-ecom-three.vercel.app${decodeURIComponent(selectedImage)}`,
                width: 1200,
                height: 1800,
              }}
              enlargedImageContainerDimensions={{ width: "240%", height: "240%" }}
            />
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div className={styles.product_info}>
          <h1>{productDetails?.product.title || "Loading..."}</h1>
          <div className={styles.review}>
            <Image src={star} alt="Star icon" height={24} />
            <Image src={star} alt="Star icon" height={24} />
            <h1>(200 reviews)</h1>
          </div>
          <p>{productDetails?.product.description || "Loading..."}</p>

          <div className={styles.price_items}>
            <h1>{productDetails ? `${productDetails.product.price} Rs.` : "Loading..."}</h1>
            <CartButton pid={pid!} />
          </div>

          <div className={styles.icons}>
            <Image src={Share} alt="Share icon" />
            <WhatsappShareButton url="http://localhost:3000/product-details/24fhgbe5ef">
              <h2>Share</h2>
            </WhatsappShareButton>
          </div>

          <div className={styles.product_list_images}>
            {productDetails?.product.product_images.map((imageObj, index) => (
              <div key={index} onClick={() => handleThumbnailClick(imageObj.images)} className={styles.thumbnail}>
                <Image
                  src={`https://django-ecom-three.vercel.app${decodeURIComponent(imageObj.images)}`}
                  alt={`Product image ${index + 1}`}
                  width={40}
                  height={40}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.customer_review}>
        <h1>Customer Reviews</h1>
        {productDetails?.review.length ? (
          productDetails.review.map((rev, index) => (
            <div key={index}>
              <Image src={Boys} alt="Avatar" height={32} width={32} />
              <h1>{rev.subject}</h1>
              <p>{rev.review}</p>
            </div>
          ))
        ) : (
          <p>No Reviews Yet.</p>
        )}

        <button onClick={handleAddReview}>Add Your Review</button>
        {reviewPopup && (
          <form onSubmit={handleReviewSubmit}>
            <input type="text" name="subject" placeholder="Subject" onChange={handleChange} value={review.subject} />
            <textarea name="review" placeholder="Review" onChange={handleChange} value={review.review} />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancelReview}>
              Cancel
            </button>
          </form>
        )}
        {error && <p>{error}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
