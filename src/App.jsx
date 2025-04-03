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

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={
        <Layout>
          <HomePage />
        </Layout>
      } />
      <Route path="/homepage" element={
        <Layout>
          <HomePage />
        </Layout>
      } />
      <Route path="/services" element={
        <Layout>
          <ServicesSection />
        </Layout>
      } />
      <Route path="/services/appointment" element={
        <Layout>
          <Appointment />
        </Layout>
      } />
      <Route path="/services/ayurvedic-treatment" element={
        <Layout>
          <AyurvedicTreatment />
        </Layout>
      } />
      <Route path="/services/blood-bank" element={
        <Layout>
          <BloodBank />
        </Layout>
      } />
      <Route path="/feature" element={
        <Layout>
          <Feature />
        </Layout>
      } />
      <Route path="/services/:serviceId" element={
        <Layout>
          <ServiceDetails />
        </Layout>
      } />
    </Routes>
  );
}

export default App;