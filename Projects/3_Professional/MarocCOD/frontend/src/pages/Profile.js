import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/my-orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('خطأ في جلب الطلبات:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      processing: 'قيد المعالجة',
      shipped: 'تم الشحن',
      delivered: 'تم التوصيل',
      cancelled: 'ملغي'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1>حسابي</h1>

        <div className="profile-layout">
          <div className="profile-info card">
            <h2>معلومات الحساب</h2>
            <p><strong>الاسم:</strong> {user?.name}</p>
            <p><strong>البريد الإلكتروني:</strong> {user?.email}</p>
          </div>

          <div className="orders-section">
            <h2>طلباتي</h2>
            
            {loading ? (
              <p>جاري التحميل...</p>
            ) : orders.length === 0 ? (
              <p>لا توجد طلبات</p>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card card">
                    <div className="order-header">
                      <h3>طلب #{order.order_number}</h3>
                      <span className={`status status-${order.order_status}`}>
                        {getStatusText(order.order_status)}
                      </span>
                    </div>
                    <div className="order-details">
                      <p><strong>التاريخ:</strong> {new Date(order.created_at).toLocaleDateString('ar-MA')}</p>
                      <p><strong>المجموع:</strong> {order.total_amount} درهم</p>
                      <p><strong>طريقة الدفع:</strong> الدفع عند التسليم</p>
                      <p><strong>المدينة:</strong> {order.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
