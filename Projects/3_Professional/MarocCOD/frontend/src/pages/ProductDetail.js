import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error('خطأ في جلب المنتج:', error);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('تمت إضافة المنتج إلى السلة');
  };

  if (!product) {
    return <div className="container"><p>جاري التحميل...</p></div>;
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-layout">
          <div className="product-images">
            <img src={product.image_main || '/placeholder.jpg'} alt={product.name_ar} />
          </div>

          <div className="product-content">
            <h1>{product.name_ar}</h1>
            
            <div className="product-price-section">
              {product.discount_price ? (
                <>
                  <span className="price-old">{product.price} درهم</span>
                  <span className="price-new">{product.discount_price} درهم</span>
                </>
              ) : (
                <span className="price">{product.price} درهم</span>
              )}
            </div>

            <div className="product-description">
              <h3>الوصف</h3>
              <p>{product.description_ar}</p>
            </div>

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">متوفر في المخزون ({product.stock})</span>
              ) : (
                <span className="out-of-stock">غير متوفر</span>
              )}
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button 
                className="btn-primary"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                أضف إلى السلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
