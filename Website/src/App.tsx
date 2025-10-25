import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; 
import CartSection from './pages/Cart/Cart'
import Layout from './layout/Layout';
import HomeSection from './pages/Home';
import ProductSection from './pages/Product';
import AboutSection from './pages/About';
import ContactusSection from './pages/Contact';
import Termspagesection from './pages/Terms';
import Refundpagesection from './pages/Refund';
import Privacypagesection from './pages/privacy';
import FAQSection from './component/FAQ/FAQ';
import PagenotfoundSection from './component/Pagenotfound/Pagenotfound';
import ProductDetailsSection from './pages/Product/ProductDetails';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={ <Layout><HomeSection /> </Layout> } />  
        <Route path='/product' element={<Layout> <ProductSection /> </Layout>} />  
        <Route path='/product-detail/:id' element={<Layout> <ProductDetailsSection /> </Layout>} />  
        <Route path='/about' element={<Layout> <AboutSection /> </Layout>} />  
        <Route path='/contactus' element={<Layout> <ContactusSection /> </Layout>} />  
        <Route path='/faq' element={<Layout> <FAQSection /> </Layout>} />  
        <Route path='/privacy-policy' element={<Layout> <Privacypagesection /> </Layout>} />  
        <Route path='/refund-policy' element={<Layout> <Refundpagesection /> </Layout>} />  
        <Route path='/terms' element={<Layout> <Termspagesection /> </Layout>} />  
        <Route path='/*' element={ <PagenotfoundSection /> } />  
      </Routes>
    </Router>
    </>
  )
}

export default App
