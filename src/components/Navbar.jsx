import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';
import logoImage from "../assets/vintexc-logo.png";
import "../css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const hamburgerRef = useRef(null);
  const navbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const hamburger = hamburgerRef.current;
    const navbar = navbarRef.current;
    const navItems = document.querySelectorAll('.navbar ul li');

    const handleHamburgerClick = (e) => {
      e.stopPropagation();
      navbar.classList.toggle('active');
      hamburger.classList.toggle('active');
    };

    const handleBodyClick = () => {
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        hamburger.classList.remove('active');
      }
    };

    const handleNavbarClick = (e) => {
      e.stopPropagation();
    };

    const handleNavItemClick = function() {
      navItems.forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      this.classList.add('active');
      
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

  useEffect(() => {
    const navItems = document.querySelectorAll('.navbar ul li');
    navItems.forEach(item => {
      item.classList.remove('active');
      const link = item.querySelector('a');
      if (link && link.pathname === location.pathname) {
        item.classList.add('active');
      }
    });
  }, [location]);

  return (
    <header>
      <a href="#" className="logo">
        <img src={logoImage} alt="Vintexc Logo" />
      </a>
      <nav className="navbar" id="navbar" ref={navbarRef}>
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}><Link to="/">Home</Link></li>
          <li className={location.pathname === "/market" ? "active" : ""}><Link to="/market">Market</Link></li>
          <li className={location.pathname === "/support" ? "active" : ""}><Link to="/support">Support</Link></li>
          <li className="mobile-signup-btn">
            <button className="btn" onClick={() => handleMobileButtonClick("/login")}>Sign Up</button>
          </li>
          <li className="mobile-signup-btn">
            <button className="btn btn-outline" onClick={() => handleMobileButtonClick("/login")}>Sign In</button>
          </li>
        </ul>
      </nav>
      <div className="nav-btn">
      <button className="btn" onClick={() => navigate("/signup")}>Sign Up</button>        
      <button className="btn btn-outline" onClick={() => navigate("/login")} >Sign In</button>
      </div>
      <div className="hamburger" id="hamburger" ref={hamburgerRef}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Navbar;