"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './../../../../Components/Ui/Navbar/page';
import Footer from './../../../../Components/Ui/Footer/page';
import ProductBox from '../../../../Components/Ui/Product/ProductCard/page';
import styles from './product_categories.module.css';

// Define the types for Product and Category
interface Product {
  id: number;
  pid: string;
  image: string;
  title: string;
  price: any; // Adjust this if the price is a number in your API
old_price: number; // Adjust this if the old_price is a number in your API
}

interface Category {
  category: {
    title: string;
    description: string;
  };
  products: Product[];
}

const CategoryPage: React.FC = () => {
  const cid = usePathname().split('/').pop() || ''; // Ensure cid is a string
  const [category, setCategory] = useState<Category | null>(null);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (!cid) return; // Return if the category ID is not available yet
        const response = await fetch(`https://django-ecom-three.vercel.app/categories/${cid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch category details');
        }
        const categoryData: Category = await response.json(); // Convert response to JSON format
        setCategory(categoryData);
        setFilteredProducts(categoryData.products); // Initialize with all products
      } catch (error) {
        console.error('Error fetching category details:', error);
        // Handle error here
      }
    };

    fetchCategory();
  }, [cid]);

  useEffect(() => {
    if (category) {
      let filtered = category.products;

      const minPriceNum = minPrice === '' ? -Infinity : parseFloat(minPrice);
      const maxPriceNum = maxPrice === '' ? Infinity : parseFloat(maxPrice);

      filtered = filtered.filter(product => {
        const price = parseFloat(product.price);
        if (minPrice !== '' && maxPrice !== '') {
          return price >= minPriceNum && price <= maxPriceNum;
        } else if (minPrice !== '') {
          return price >= minPriceNum;
        } else if (maxPrice !== '') {
          return price <= maxPriceNum;
        }
        return true;
      });

      setFilteredProducts(filtered);
    }
  }, [minPrice, maxPrice, category]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div>
      <Navbar />
      {category && (
        <div className={styles.categories}>
          <h1>{category.category.title}</h1>
          <p>{category.category.description}</p>

          <div className={styles.filter}>
            <h1 className="text-xl font-bold mb-4">Price Filter</h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <label className="flex flex-col sm:flex-row items-center sm:mr-20">
                Min Price:
                <input
                  type="number"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className="border border-gray-800 rounded-md p-2 w-20 bg-gray-300 mt-2 sm:mt-0 sm:ml-2"
                />
              </label>
              <label className="flex flex-col sm:flex-row items-center sm:ml-3">
                Max Price:
                <input
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className="border border-gray-800 rounded-md p-2 w-20 bg-gray-300 mt-2 sm:mt-0 sm:ml-2"
                />
              </label>
              <button
                onClick={clearFilters}
                className="bg-blue-500 text-white rounded-md p-2 mt-2 sm:mt-0 sm:ml-2 hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductBox
                  key={product.id}
                  pid={product.pid} // Pass pid to ProductBox component
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  oldPrice={product.old_price}
                />
              ))
            ) : (
              <p>No products under this category yet.</p>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CategoryPage;
