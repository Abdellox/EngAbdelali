import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="container">Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link to="/" className="back-link">← Back to Products</Link>
        
        <div className="product-detail">
          <div className="product-images">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.title} />
            ) : (
              <div className="no-image-large">No Image Available</div>
            )}
          </div>

          <div className="product-details">
            <h1>{product.title}</h1>
            <p className="price">${product.price} {product.currency}</p>
            
            {product.category && (
              <div className="detail-row">
                <span className="label">Category:</span>
                <span className="category-badge">{product.category}</span>
              </div>
            )}

            {product.moq && (
              <div className="detail-row">
                <span className="label">MOQ:</span>
                <span>{product.moq} units</span>
              </div>
            )}

            {product.supplier && (
              <div className="detail-row">
                <span className="label">Supplier:</span>
                <span>{product.supplier.name}</span>
              </div>
            )}

            {product.description && (
              <div className="description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
            )}

            {product.specifications && (
              <div className="specifications">
                <h3>Specifications</h3>
                <pre>{JSON.stringify(product.specifications, null, 2)}</pre>
              </div>
            )}

            <button className="btn btn-primary btn-large">
              Contact Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
