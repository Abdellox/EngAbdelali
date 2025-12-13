import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>المتجر المغربي</h3>
            <p>منصة تجارة إلكترونية مغربية متخصصة في المنتجات التقليدية والحرف اليدوية</p>
          </div>

          <div className="footer-section">
            <h4>روابط سريعة</h4>
            <ul>
              <li><a href="/">الرئيسية</a></li>
              <li><a href="/products">المنتجات</a></li>
              <li><a href="/about">من نحن</a></li>
              <li><a href="/contact">اتصل بنا</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>تواصل معنا</h4>
            <div className="contact-info">
              <p><FaPhone /> +212 6XX XXX XXX</p>
              <p><FaEnvelope /> info@moroccanstore.ma</p>
            </div>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaWhatsapp /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 المتجر المغربي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
