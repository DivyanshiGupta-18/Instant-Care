import { Routes, Route } from 'react-router-dom';
import Signin from "./Homepagecomponents/Signin";
import HomePage from "./components/HomePage";
import ServicesSection from './Homepagecomponents/ServicesSection';
import Appointment from './Services/Appointment'; 
import AyurvedicTreatment from './Services/AyurvedicTreatment'; 
import BloodBank from './Services/BloodBank'; 
import Layout from './components/Layout';
import ServiceDetails from './components/ServiceDetails';
import Feature from './Services/Feature'; 
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={
        <ThemeProvider>
        <Layout>
          <HomePage />
        </Layout>
        </ThemeProvider>
      } />
      <Route path="/homepage" element={
        <ThemeProvider>
        <Layout>
          <HomePage />
        </Layout>
        </ThemeProvider>
      } />
      <Route path="/services" element={
        <ThemeProvider>
        <Layout>
          <ServicesSection />
        </Layout>
        </ThemeProvider>
      } />
      <Route path="/services/appointment" element={
        <ThemeProvider>
        <Layout>
          <Appointment />
        </Layout>
        </ThemeProvider>
      } />
      <Route path="/services/ayurvedic-treatment" element={
        <ThemeProvider>
        <Layout>
          <AyurvedicTreatment />
        </Layout>
        </ThemeProvider>
      } />
      <Route path="/services/blood-bank" element={
        <ThemeProvider>
        <Layout>
          <BloodBank />
        </Layout>
        </ThemeProvider>
      } />
      <Route path="/feature" element={
        <ThemeProvider>
        <Layout>
          <Feature />
        </Layout>
        </ThemeProvider>
      } />
      <Route path="/services/:serviceId" element={
        <ThemeProvider>
        <Layout>
          <ServiceDetails />
        </Layout>
        </ThemeProvider>
      } />
    </Routes>
  );
}

export default App;