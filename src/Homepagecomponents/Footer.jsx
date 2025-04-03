import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: "#693382", color: "white" }}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-12 text-center mb-3">
            <ul className="list-inline" style={{ marginBottom: "10px" }}>
              <li className="list-inline-item">
                <a href="/" style={{ color: "white", textDecoration: "none" }}>Home</a>
              </li>
              <li className="list-inline-item">
                <a href="/news" style={{ color: "white", textDecoration: "none" }}>Health</a>
              </li>
              <li className="list-inline-item">
                <a href="/about" style={{ color: "white", textDecoration: "none" }}>About</a>
              </li>
              <li className="list-inline-item">
                <a href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact Us</a>
              </li>
              <li className="list-inline-item">
                <a href="/team" style={{ color: "white", textDecoration: "none" }}>Our Team</a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="col-md-12 text-center mb-3">
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white", margin: "0 10px" }}
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white", margin: "0 10px" }}
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white", margin: "0 10px" }}
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white", margin: "0 10px" }}
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white", margin: "0 10px" }}
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          <div className="col-md-12 text-center mb-3">
            <p className="punchline" style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
              Live every breath, embrace every moment, for life is a precious gift.
            </p>
          </div>

          <div className="col-md-12 text-center">
            <p className="copyright" style={{ fontSize: "0.9rem" }}>
              &copy; {new Date().getFullYear()} AI-SAHAYAK BY AI-AGENT.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;