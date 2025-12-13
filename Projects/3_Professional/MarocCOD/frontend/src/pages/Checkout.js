import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: user?.name || '',
    phone: '',
    city: '',
    address_line1: '',
    address_line2: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // إنشاء العنوان أولاً
      const addressResponse = await axios.post('http://localhost:5000/api/addresses', formData);
      const addressId = addressResponse.data.addressId;

      // إنشاء الطلب
      const orderData = {
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        shipping_address_id: addressId,
        payment_method: 'cod',
        notes: formData.notes
      };

      await axios.post('http://localhost:5000/api/orders', orderData);

      clearCart();
      alert('تم إنشاء الطلب بنجاح! سيتم التواصل معك قريباً.');
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || 'خطأ في إنشاء الطلب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>إتمام الطلب</h1>

        <div className="checkout-layout">
          <div className="checkout-form">
            <h2>معلومات التوصيل</h2>
            
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>الاسم الكامل</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>المدينة</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>العنوان</label>
                <input
                  type="text"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>تفاصيل إضافية (اختياري)</label>
                <input
                  type="text"
                  name="address_line2"
                  value={formData.address_line2}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>ملاحظات (اختياري)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'جاري المعالجة...' : 'تأكيد الطلب'}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2>ملخص الطلب</h2>
            
            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <span>{item.name_ar} × {item.quantity}</span>
                  <span>{((item.discount_price || item.price) * item.quantity).toFixed(2)} درهم</span>
                </div>
              ))}
            </div>

            <div className="summary-total">
              <span>المجموع الكلي:</span>
              <span>{getCartTotal().toFixed(2)} درهم</span>
            </div>

            <div className="payment-info">
              <h3>طريقة الدفع</h3>
              <p>الدفع عند التسليم (COD)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
