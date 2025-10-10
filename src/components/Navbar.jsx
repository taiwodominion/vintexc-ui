import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/vintexc-logo.png';
import '../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const token = getToken();
    const has = !!token;
    setIsLoggedIn(has);
    if (has) {
      console.log('Navbar: user is logged in ');
    } else {
      console.log('Navbar: user is NOT logged in');
    }
  }, [location]);

  // listen to changes from other tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'token') {
        const has = !!e.newValue;
        setIsLoggedIn(has);
        if (has)
          console.log('Navbar (storage): logged in — token:', e.newValue);
        else console.log('Navbar (storage): logged out');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const onAuthChange = () => {
      const token = getToken();
      const has = !!token;
      setIsLoggedIn(has);
      if (has) console.log('Navbar (authChange): logged in');
      else console.log('Navbar (authChange): logged out');
    };
    window.addEventListener('authChange', onAuthChange);
    return () => window.removeEventListener('authChange', onAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setMenuActive(false);
    console.log('Navbar: user logged out.');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  const handleNavLinkClick = (path) => {
    setMenuActive(false);
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="overlay">
      <header>
        <Link to="/" className="logo" onClick={() => setMenuActive(false)}>
          <img src={logoImage} alt="Vintexc Logo" />
        </Link>

        <nav
          className={`navbar ${menuActive ? 'active' : ''}`}
          id="navbar"
          ref={navbarRef}
        >
          <ul>
            {/* ✅ Only when logged in */}
            {!isLoggedIn ? (
              <>
                <li className={isActive('/') ? 'active' : ''}>
                  <Link to="/" onClick={() => handleNavLinkClick('/')}>
                    Home
                  </Link>
                </li>
                <li className={isActive('/market') ? 'active' : ''}>
                  <Link
                    to="/market"
                    onClick={() => handleNavLinkClick('/market')}
                  >
                    Market
                  </Link>
                </li>
                <li className={isActive('/support') ? 'active' : ''}>
                  <Link
                    to="/support"
                    onClick={() => handleNavLinkClick('/support')}
                  >
                    Support
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className={isActive('/') ? 'active' : ''}>
                  <Link to="/" onClick={() => handleNavLinkClick('/')}>
                    Home
                  </Link>
                </li>
                <li className={isActive('/market') ? 'active' : ''}>
                  <Link
                    to="/market"
                    onClick={() => handleNavLinkClick('/market')}
                  >
                    Market
                  </Link>
                </li>
                <li className={isActive('/assets') ? 'active' : ''}>
                  <Link
                    to="/assets"
                    onClick={() => handleNavLinkClick('/assets')}
                  >
                    Assets
                  </Link>
                </li>
                <li className={isActive('/futures') ? 'active' : ''}>
                  <Link
                    to="/futures"
                    onClick={() => handleNavLinkClick('/futures')}
                  >
                    Futures
                  </Link>
                </li>
                <li className={isActive('/ai-trading') ? 'active' : ''}>
                  <Link
                    to="/ai-trading"
                    onClick={() => handleNavLinkClick('/ai-trading')}
                  >
                    Ai Trading
                  </Link>
                </li>
                <li className={isActive('/support') ? 'active' : ''}>
                  <Link
                    to="/support"
                    onClick={() => handleNavLinkClick('/support')}
                  >
                    Support
                  </Link>
                </li>
              </>
            )}
            {/* {isLoggedIn && (
              <>
                <li className={isActive("/assets") ? "active" : ""}>
                  <Link to="/assets" onClick={() => handleNavLinkClick("/assets")}>Assets</Link>
                </li>
                <li className={isActive("/futures") ? "active" : ""}>
                  <Link to="/futures" onClick={() => handleNavLinkClick("/futures")}>Futures</Link>
                </li>
              </>
            )} */}

            {/* Mobile buttons */}
            {!isLoggedIn ? (
              <>
                <li className="mobile-signup-btn">
                  <Link
                    className="btn btn-outline"
                    to="/signup"
                    onClick={() => setMenuActive(false)}
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="mobile-signup-btn">
                  <Link
                    className="btn"
                    to="/login"
                    onClick={() => setMenuActive(false)}
                  >
                    Sign In
                  </Link>
                </li>
              </>
            ) : (
              <li className="mobile-signup-btn">
                <button className="btn btn-outline" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        <div className="nav-btn">
          {!isLoggedIn ? (
            <>
              <button
                className="btn btn-outline"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
              <button className="btn" onClick={() => navigate('/login')}>
                Sign In
              </button>
            </>
          ) : (
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <button
          ref={hamburgerRef}
          className={`hamburger ${menuActive ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setMenuActive((s) => !s);
          }}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
    </div>
  );
};

export default Navbar;