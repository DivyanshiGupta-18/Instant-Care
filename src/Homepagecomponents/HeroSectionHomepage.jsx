import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HeroSectionHomepage = () => {

  return (
    <div
      className="hero-section mb-5"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100vh",
      }}
    >
      {/* Video Background */}
      <video autoPlay loop muted playsInline style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: 0,
        }}
      >
        <source
          src="vecteezy_animation-of-doctor-checking-patient-s-health-condition_46664534.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <section
        className="hero text-white py-5"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="container text-center py-5 my-5">
          <h1
            className="display-4 mb-3 fw-bold"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            Find Available HealthCare Facilities in Real-Time
          </h1>
          <p
            className="lead mb-4 fw-semibold"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            Smart Healthcare with AI & Ayurveda – Fast, Accurate, Holistic!
          </p>
          <button
            className="btn btn-lg"
            // onClick={handleEmergency}

            style={{
              animation: "pulse 2s infinite",
              boxShadow: "linear-gradient(135deg, #693382, #0D7C66",
              backgroundColor : "#693382",
            }}
          >
            <Link to="/signin" className='text-white text-decoration-none'>Get Started</Link>
            {/* Emergency */}
            
          </button>
        </div>
      </section>

      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(220, 53, 69, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
            }
          }

          .hero {
            max-height: 100vh;
            display: flex;
            align-items: center;
          }

          .form-control:focus {
            box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
            border-color: #28a745;
          }
        `}
      </style>
    </div>
  );
};

export default HeroSectionHomepage;
