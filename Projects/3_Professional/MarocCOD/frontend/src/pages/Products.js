import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('خطأ في جلب التصنيفات:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/products?';
      if (selectedCategory) url += `category=${selectedCategory}&`;
      if (searchQuery) url += `search=${searchQuery}&`;
      
      const response = await axios.get(url);
      setProducts(response.data.products);
    } catch (error) {
      console.error('خطأ في جلب المنتجات:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (categoryId) => {
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-layout">
          <aside className="sidebar">
            <h3>التصنيفات</h3>
            <ul className="category-list">
              <li>
                <button 
                  className={!selectedCategory ? 'active' : ''}
                  onClick={() => handleCategoryFilter(null)}
                >
                  جميع المنتجات
                </button>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    className={selectedCategory === String(category.id) ? 'active' : ''}
                    onClick={() => handleCategoryFilter(category.id)}
                  >
                    {category.name_ar}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="products-content">
            <h1>المنتجات</h1>
            
            {loading ? (
              <p>جاري التحميل...</p>
            ) : products.length === 0 ? (
              <p>لا توجد منتجات</p>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <Link key={product.id} to={`/products/${product.id}`} className="product-card">
                    <div className="product-image">
                      <img src={product.image_main || '/placeholder.jpg'} alt={product.name_ar} />
                    </div>
                    <div className="product-info">
                      <h3>{product.name_ar}</h3>
                      <div className="product-price">
                        {product.discount_price ? (
                          <>
                            <span className="price-old">{product.price} درهم</span>
                            <span className="price-new">{product.discount_price} درهم</span>
                          </>
                        ) : (
                          <span className="price">{product.price} درهم</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
