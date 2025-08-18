import logoImage from "../assets/vintexc-logo.png";
import bitcoinImg from "../assets/bitcoin.png"
import ethImg from "../assets/eth.png"
import coinsImg from "../assets/coins.png"
import dogeImg from "../assets/doge.png"
import { useEffect, useRef } from 'react';
import "../css/Hero.css";

const Hero = () => {
  const hamburgerRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const hamburger = hamburgerRef.current;
    const navbar = navbarRef.current;
    const navItems = document.querySelectorAll('.navbar ul li');

    // Toggle menu on hamburger click
    const handleHamburgerClick = (e) => {
      e.stopPropagation();
      navbar.classList.toggle('active');
      hamburger.classList.toggle('active');
    };

    // Close menu when clicking outside
    const handleBodyClick = () => {
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        hamburger.classList.remove('active');
      }
    };

    // Prevent menu from closing when clicking inside it
    const handleNavbarClick = (e) => {
      e.stopPropagation();
    };

    // Active nav item functionality
    const handleNavItemClick = function() {
      // Remove active class from all items
      navItems.forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Close mobile menu if open
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        hamburger.classList.remove('active');
      }
    };

    hamburger.addEventListener('click', handleHamburgerClick);
    document.body.addEventListener('click', handleBodyClick);
    navbar.addEventListener('click', handleNavbarClick);
    navItems.forEach(item => {
      item.addEventListener('click', handleNavItemClick);
    });

    return () => {
      hamburger.removeEventListener('click', handleHamburgerClick);
      document.body.removeEventListener('click', handleBodyClick);
      navbar.removeEventListener('click', handleNavbarClick);
      navItems.forEach(item => {
        item.removeEventListener('click', handleNavItemClick);
      });
    };
  }, []);

  return (
    <div className="overlay">
    <section className="hero-nav">
      <header>
        <a href="#" className="logo">
          <img src={logoImage} alt="Vintexc Logo" />
        </a>
        <nav className="navbar" id="navbar" ref={navbarRef}>
          <ul>
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#">Market</a></li>
            <li><a href="#">Futures</a></li>
            <li><a href="#">Ai Trading</a></li>
            <li><a href="#">Support</a></li>
            <li className="mobile-signup-btn">
              <button className="btn">Sign Up</button>
            </li>
          </ul>
        </nav>
        <div className="nav-btn">
          <button className="btn">Sign Up</button>
        </div>
        <div className="hamburger" id="hamburger" ref={hamburgerRef}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <section className="hero">
        <div className="coin coin-1">
          <img src={bitcoinImg} alt="Bitcoin" />
        </div>
        <div className="coin coin-2">
          <img src={dogeImg} alt="Dogecoin" />
        </div>
        <div className="coin coin-3">
          <img src={ethImg} alt="Ethereum" />
        </div>
        <div className="coin coin-4">
          <img src={coinsImg} alt="Cryptocurrency" />
        </div>

        <div className="hero-content">
          <div className="hero-texts">
            <h1>Master Tomorrow's <span>Markets. Today.</span></h1>
            <p>
              Vintexc delivers precision futures trading and empowers your strategies with state-of-the-art AI trading features, 
              giving you an intelligent edge in volatile markets.
            </p>
          </div>
          <div className="hero-btns">
            <button className="btn">Get Started</button>
            <button className="btn btn-outline">Start Trading</button>
          </div>
        </div>
      </section>
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
    </section>
    </div>
  );
};

export default Hero;