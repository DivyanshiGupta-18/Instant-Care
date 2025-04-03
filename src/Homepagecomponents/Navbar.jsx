import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage for saved mode, default to light mode
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || false;
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // Save mode to local storage
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    try {
      console.log('Navbar: Checking authentication...');
      const authToken = localStorage.getItem('authToken');
      console.log('Navbar auth check:', {
        hasToken: !!authToken,
        tokenLength: authToken ? authToken.length : 0,
        currentPath: window.location.pathname,
      });
      setIsAuthenticated(!!authToken);
    } catch (error) {
      console.error('Navbar authentication error:', {
        error: error,
        message: error.message,
        stack: error.stack,
        currentPath: window.location.pathname,
      });
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    try {
      console.log('Navbar: Signing out...');
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      console.log('Navbar: Successfully signed out, redirecting to signin');
      navigate('/signin');
    } catch (error) {
      console.error('Navbar sign out error:', {
        error: error,
        message: error.message,
        stack: error.stack,
      });
      navigate('/signin');
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    try {
      console.log('Navbar: Logo clicked, checking auth state:', { isAuthenticated });
      if (isAuthenticated) {
        console.log('Navbar: Authenticated, navigating to home');
        navigate('/');
      } else {
        console.log('Navbar: Not authenticated, navigating to signin');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Navbar logo click error:', {
        error: error,
        message: error.message,
        stack: error.stack,
      });
      navigate('/signin');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light fixed-top ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark-mode-nav' : ''}`}>
      <div className="container">
        <Link
          className="navbar-brand"
          to="#"
          onClick={handleLogoClick}
          style={{
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.75rem',
            fontWeight: '700',
            letterSpacing: '0.5px',
          }}
        >
          <img
            src="/logo-white.png"
            alt="Logo"
            style={{
              height: '36px',
              marginRight: '12px',
              transition: 'transform 0.3s ease',
            }}
            className="navbar-logo"
          />
          AI-SAHAYAK
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-4">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="#"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/ayurvedic' ? 'active' : ''}`}
                to="#"
              >
                Ayurvedic Health
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
                to="#"
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                to="#"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="nav-item">
            {isAuthenticated ? (
              <button className="btn btn-sign" onClick={handleSignOut}>
                Sign Out
              </button>
            ) : (
              <Link className="btn btn-sign" to="/signin">
                Sign In
              </Link>
            )}
          </div>
          {/* <button className='btn btn-sign' onClick={toggleDarkMode}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button> */}
        </div>
      </div>

      <style>
        {`
          body.dark-mode {
            background-color: #121212;
            color: #FFFFFF;
          }
          .dark-mode-nav {
            background-color: #212121;
          }
          .navbar {
            background-color: #693382;
            padding: 0;
            transition: all 0.3s ease;
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .navbar .container {
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
          }

          .navbar.scrolled {
            background-color: rgba(105, 51, 130, 0.98);
            padding: 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .navbar.scrolled .container {
            padding-top: 0.15rem;
            padding-bottom: 0.15rem;
          }

          .navbar-logo {
            height: 32px;
            margin-right: 12px;
            transition: transform 0.3s ease;
          }

          .navbar-logo:hover {
            transform: scale(1.05);
          }

          .navbar-brand {
            color: #FFFFFF !important;
            display: flex;
            align-items: center;
            font-size: 1.6rem;
            font-weight: 700;
            letter-spacing: 0.5px;
          }

          .nav-link {
            color: #FFFFFF !important;
            font-weight: 600;
            font-size: 0.95rem;
            padding: 0.2rem 1.25rem !important;
            margin: 0 0.3rem;
            position: relative;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.7px;
          }

          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2.5px;
            background-color: #FFFFFF;
            transition: all 0.3s ease;
            transform: translateX(-50%);
            border-radius: 2px;
          }

          .nav-link:hover::after,
          .nav-link.active::after {
            width: 70%;
          }

          .nav-link:hover {
            transform: translateY(-2px);
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .nav-link.active {
            font-weight: 700;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          .navbar-toggler {
            border: 2px solid #FFFFFF;
            padding: 0.5rem;
          }

          .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
          }

          .btn-sign {
            background-color: transparent;
            border: 2px solid #FFFFFF;
            color: #FFFFFF;
            font-weight: 600;
            font-size: 0.95rem;
            padding: 0.3rem 1.5rem;
            border-radius: 50px;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.7px;
          }

          .btn-sign:hover {
            background-color: #FFFFFF;
            color: #693382;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          @media (max-width: 991.98px) {
            .navbar-collapse {
              background-color: #693382;
              padding: 1.25rem;
              border-radius: 12px;
              margin-top: 0.75rem;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }

            .nav-link {
              padding: 0.85rem 1.25rem !important;
              text-align: center;
              font-weight: 600;
            }

            .nav-item {
              margin: 0.3rem 0;
            }

            .btn-sign {
              width: 100%;
              margin-top: 0.5rem;
              text-align: center;
            }
          }

          @media (min-width: 992px) {
            .navbar-nav {
              align-items: center;
            }
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;