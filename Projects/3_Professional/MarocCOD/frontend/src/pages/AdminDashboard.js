import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, delivered: 0 });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/all');
      const ordersData = response.data.orders;
      setOrders(ordersData);

      // حساب الإحصائيات
      const total = ordersData.length;
      const pending = ordersData.filter(o => o.order_status === 'pending').length;
      const delivered = ordersData.filter(o => o.order_status === 'delivered').length;
      setStats({ total, pending, delivered });
    } catch (error) {
      console.error('خطأ في جلب الطلبات:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        order_status: newStatus,
        payment_status: newStatus === 'delivered' ? 'paid' : 'pending'
      });
      fetchOrders();
      alert('تم تحديث حالة الطلب');
    } catch (error) {
      alert('خطأ في تحديث الطلب');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>لوحة التحكم</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>إجمالي الطلبات</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3>طلبات قيد الانتظار</h3>
            <p className="stat-number">{stats.pending}</p>
          </div>
          <div className="stat-card">
            <h3>طلبات مكتملة</h3>
            <p className="stat-number">{stats.delivered}</p>
          </div>
        </div>

        <div className="orders-management">
          <h2>إدارة الطلبات</h2>
          
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>رقم الطلب</th>
                  <th>العميل</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.order_number}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.total_amount} درهم</td>
                    <td>
                      <span className={`status status-${order.order_status}`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString('ar-MA')}</td>
                    <td>
                      <select
                        value={order.order_status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="confirmed">مؤكد</option>
                        <option value="processing">قيد المعالجة</option>
                        <option value="shipped">تم الشحن</option>
                        <option value="delivered">تم التوصيل</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
