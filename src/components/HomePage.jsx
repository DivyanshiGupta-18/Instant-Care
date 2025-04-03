import React, { Suspense, lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RatingSection from '../Homepagecomponents/RatingSection';

// Lazy load components with error logging
const withErrorLogging = (importFn, componentName) => {
  console.log(`Attempting to load component: ${componentName}`);
  return importFn().catch(err => {
    console.error(`Error loading ${componentName}:`, {
      error: err,
      message: err.message,
      stack: err.stack
    });
    throw err;
  });
};

// Lazy load components
const HeroSectionHomepage = lazy(() => withErrorLogging(
  () => import("../Homepagecomponents/HeroSectionHomepage"),
  "HeroSectionHomepage"
));

const Trusted = lazy(() => withErrorLogging(
  () => import("../Homepagecomponents/Trusted"),
  "Trusted"
));

//  const DiseaseAnalyzer = lazy(() => withErrorLogging (
//   () => import("../Homepagecomponents/DiseaseAnalyzer")
//  ))

const AyurvedicLifestyleTracker = lazy(() => withErrorLogging(
  () => import("../Homepagecomponents/AyurvedicLifestyleTracker"),
  "AyurvedicLifestyleTracker"
));

const ServicesSection = lazy(() => withErrorLogging(
  () => import("../Homepagecomponents/ServicesSection"),
  "ServicesSection"
));

const AyurvedicHealthReports = lazy(() => withErrorLogging(
  () => import("../Homepagecomponents/AyurvedicHealthReports"),
  "AyurvedicHealthReports"
));

const AboutPage = lazy(() => withErrorLogging(
  () => import("../Homepagecomponents/AboutPage"),
  "AboutPage"
));

const TestimonialsSection = lazy(() => withErrorLogging(
  () => import("../Homepagecomponents/TestimonialsSection"),
  "TestimonialsSection"
));

// Loading component
const SectionLoader = () => (
  <div className="section-loader d-flex justify-content-center align-items-center py-5">
    <div className="spinner-grow text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function HomePage() {
  const navigate = useNavigate();
  // const { theme } = useContext(ThemeContext);

  useEffect(() => {
    try {
      console.log('Checking authentication...');
      const authToken = localStorage.getItem('authToken');
      console.log('Auth check:', { 
        hasToken: !!authToken,
        tokenLength: authToken ? authToken.length : 0,
        currentPath: window.location.pathname
      });
      
      if (!authToken) {
        console.log('No auth token found, redirecting to signin');
        navigate('/signin');
      } else {
        console.log('Auth token found, staying on page');
      }
    } catch (error) {
      console.error('Authentication error:', {
        error: error,
        message: error.message,
        stack: error.stack,
        currentPath: window.location.pathname
      });
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <>
      <div className="homepage">
        {/* Hero Section */}
        <section className="hero-section">
          <Suspense fallback={<SectionLoader />}>
            <HeroSectionHomepage />
          </Suspense>
        </section>

        {/* Trust Indicators */}
        <section className="trusted-section bg-light">
          <Suspense fallback={<SectionLoader />}>
            <Trusted />
          </Suspense>
        </section>

         {/* DiseaseAnalyzer */}
         {/* <section className="disease-analyzer py-5">
        <Suspense fallback={<SectionLoader />}>
            <DiseaseAnalyzer />
          </Suspense>
        </section> */}

        {/* Main Content */}
        <main>
          {/* Ayurvedic Lifestyle Section */}
          <section className="lifestyle-section py-5">
            <Suspense fallback={<SectionLoader />}>
              <AyurvedicLifestyleTracker />
            </Suspense>
          </section>

          {/* Services Section */}
          <section className="services-section bg-light">
            <Suspense fallback={<SectionLoader />}>
              <ServicesSection />
            </Suspense>
          </section>

          {/* Health Reports Section */}
          <section className="health-reports-section py-5">
            <Suspense fallback={<SectionLoader />}>
              <AyurvedicHealthReports />
            </Suspense>
          </section>

          {/* Rating Section */}
          <section className="rating-section bg-light">
            <Suspense fallback={<SectionLoader />}>
              <RatingSection />
            </Suspense>
          </section>

          {/* About Section */}
          <section className="about-section">
            <Suspense fallback={<SectionLoader />}>
              <AboutPage />
            </Suspense>
          </section>

          {/* Application Section */}
          <section className="application-section bg-light">
            <Suspense fallback={<SectionLoader />}>
            </Suspense>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials-section">
            <Suspense fallback={<SectionLoader />}>
              <TestimonialsSection />
            </Suspense>
          </section>
        </main>
      </div>

      <style>
        {`
          .homepage {
            overflow-x: hidden;
            padding-top: 60px; /* Add padding to account for fixed navbar */
          }

          .section-loader {
            min-height: 200px;
          }

          /* Smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Section transitions */
          section {
            transition: opacity 0.3s ease-in-out;
            opacity: 0;
            animation: fadeIn 0.5s ease-in-out forwards;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Section spacing and backgrounds */
          section {
            position: relative;
            overflow: hidden;
          }

          section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: inherit;
            filter: brightness(0.98);
            z-index: -1;
          }

          .bg-light {
            background-color: #f8f9fa !important;
          }

          /* Responsive spacing */
          @media (max-width: 768px) {
            .homepage {
              padding-top: 56px;
            }

            section {
              padding: 2rem 0;
            }
          }

          /* Improved accessibility */
          @media (prefers-reduced-motion: reduce) {
            html {
              scroll-behavior: auto;
            }
            
            section {
              transition: none;
              animation: none;
            }
          }
        `}
      </style>
    </>
  );
}

export default HomePage;