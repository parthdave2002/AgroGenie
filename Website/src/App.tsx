import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./layout/Layout";
import PagenotfoundSection from "./component/Pagenotfound/Pagenotfound";

/* Lazy Loaded Pages */
const HomeSection = lazy(() => import("./pages/Home"));
const AboutSection = lazy(() => import("./pages/About"));
const GallerySection = lazy(() => import("./pages/Gallery"));
const ProductSection = lazy(() => import("./pages/Product"));
const ProductDetailsSection = lazy(() => import("./pages/Product/ProductDetails"));
const ContactusSection = lazy(() => import("./pages/Contact"));
const ResearchSection = lazy(() => import("./pages/Research"));
const Termspagesection = lazy(() => import("./pages/Terms"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div className="loader">Loading...</div>}>
        <Routes>

          {/* Layout Route */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomeSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/gallery" element={<GallerySection />} />
            <Route path="/product" element={<ProductSection />} />
            <Route path="/product-detail/:id" element={<ProductDetailsSection />} />
            <Route path="/contactus" element={<ContactusSection />} />
            <Route path="/research" element={<ResearchSection />} />
            <Route path="/terms" element={<Termspagesection />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<PagenotfoundSection />} />

        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
