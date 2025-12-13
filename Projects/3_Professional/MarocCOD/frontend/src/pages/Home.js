import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const moroccanImages = [
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500',
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500',
    'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500',
    'https://images.unsplash.com/photo-1602351447937-745cb720612f?w=500',
    'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=500',
    'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=500',
    'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=500'
  ];

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('خطأ في جلب التصنيفات:', error);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products?limit=8');
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error('خطأ في جلب المنتجات:', error);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>✨ اكتشف جمال المغرب الأصيل ✨</h1>
            <p>منتجات مغربية تقليدية فاخرة | حرف يدوية أصيلة | جودة عالية | توصيل لجميع أنحاء المملكة</p>
            <Link to="/products" className="btn-primary">استكشف المنتجات</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>توصيل سريع</h3>
              <p>توصيل لجميع مدن المغرب</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>الدفع عند الاستلام</h3>
              <p>ادفع عند استلام طلبك</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>جودة مضمونة</h3>
              <p>منتجات أصلية 100%</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>عروض خاصة</h3>
              <p>خصومات وهدايا مميزة</p>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2>🏺 تصنيفات المنتجات</h2>
          <div className="categories-grid">
            {categories.length > 0 ? (
              categories.map(category => (
                <Link key={category.id} to={`/products?category=${category.id}`} className="category-card">
                  <h3>{category.name_ar}</h3>
                  <p>{category.description || 'اكتشف مجموعتنا المميزة'}</p>
                </Link>
              ))
            ) : (
              <>
                <div className="category-card">
                  <h3>الملابس التقليدية</h3>
                  <p>قفاطين، جلابيب، وملابس مغربية أصيلة</p>
                </div>
                <div className="category-card">
                  <h3>الإكسسوارات</h3>
                  <p>مجوهرات وإكسسوارات مغربية فاخرة</p>
                </div>
                <div className="category-card">
                  <h3>الديكور المنزلي</h3>
                  <p>ديكورات منزلية بلمسة مغربية</p>
                </div>
                <div className="category-card">
                  <h3>الحرف اليدوية</h3>
                  <p>منتجات حرفية يدوية أصيلة</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2>⭐ المنتجات المميزة</h2>
          <p className="section-subtitle">اختيارات خاصة من أجود المنتجات المغربية</p>
          <div className="products-grid">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <Link key={product.id} to={`/products/${product.id}`} className="product-card">
                  <div className="product-image">
                    <img 
                      src={product.image_main || moroccanImages[index % moroccanImages.length]} 
                      alt={product.name_ar}
                      onError={(e) => {
                        e.target.src = moroccanImages[index % moroccanImages.length];
                      }}
                    />
                    {product.discount_price && (
                      <span className="discount-badge">
                        خصم {Math.round((1 - product.discount_price / product.price) * 100)}%
                      </span>
                    )}
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
              ))
            ) : (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="product-card">
                  <div className="product-image">
                    <img src={moroccanImages[index]} alt={`منتج ${index + 1}`} />
                    {index % 3 === 0 && <span className="discount-badge">خصم 20%</span>}
                  </div>
                  <div className="product-info">
                    <h3>منتج مغربي أصيل {index + 1}</h3>
                    <div className="product-price">
                      {index % 3 === 0 ? (
                        <>
                          <span className="price-old">{500 + index * 50} درهم</span>
                          <span className="price-new">{400 + index * 40} درهم</span>
                        </>
                      ) : (
                        <span className="price">{300 + index * 30} درهم</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <h2>🇲🇦 عن المتجر المغربي</h2>
            <p>
              نحن متخصصون في تقديم أجود المنتجات المغربية التقليدية والحرف اليدوية الأصيلة.
              نفخر بتقديم منتجات عالية الجودة تعكس التراث المغربي العريق والحرفية المتقنة.
            </p>
            <p>
              جميع منتجاتنا مصنوعة بأيدي حرفيين مغاربة مهرة، ونضمن لك الأصالة والجودة في كل قطعة.
            </p>
            <div className="about-stats">
              <div className="stat">
                <h3>1000+</h3>
                <p>منتج متنوع</p>
              </div>
              <div className="stat">
                <h3>5000+</h3>
                <p>عميل راضٍ</p>
              </div>
              <div className="stat">
                <h3>50+</h3>
                <p>حرفي مغربي</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
