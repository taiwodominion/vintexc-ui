import React from 'react'
import logoImage from "../assets/vintexc-logo.png";
import qrCodeImg from "../assets/qr-code.png"
import twitterImg from "../assets/twitter.png"
import playStoreImg from "../assets/playstore.png"
import appleStoreImg from "../assets/apple.png"
import microsoftImg from "../assets/microsoft.png"
import shoppingImg from "../assets/shopping.png"

import '../css/Footer.css'


const Footer = () => {
  return (
    <div>
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logoImage} alt="Company Logo" />
          <p>We provide innovative solutions to help your business grow and succeed in the digital world.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Help</h3>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/shipping">Shipping</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/order-status">Order Status</a></li>
          </ul>
        </div>

        <div className="footer-download">
          <h3>Scan to download</h3>
          <img src={qrCodeImg} alt="QR Code" /> {/* Fixed img tag (self-closing) */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Copyright 2024, 2018-{new Date().getFullYear()} Vintexc Exchange. All Rights Reserved.</p>
        <div className="social-icons">
            <a href="">
              <img src={playStoreImg} alt="" />
            </a>
            <img src={shoppingImg} alt="" />
            <img src={microsoftImg} alt="" />
            <img src={appleStoreImg} alt="" />
            <img src={twitterImg} alt="" />
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;