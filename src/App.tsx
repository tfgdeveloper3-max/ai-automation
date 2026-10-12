import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Hero from './components/Hero';
import Features from './components/Features';
import SkillsSection from './components/SkillsSection';
import SuccessStories from './components/caseStudy';
import HowItWorks from './components/HowitWorks';
import Testimonials from './components/Testimonials';
import CtaBanner from './components/Ctasection';
import Faqs from './components/Faqsection';
import FooterIntroReveal from './components/FooterIntroReveal';
import FooterSection from './components/FooterSection';
import Preloader from './components/Preloader';


import './styles/fonts.css';
import './App.css';
import AboutPage from './components/pages/About/page';
import ServicePage from './components/pages/Service/page';
import BlogPage from './components/pages/Blog/page';
import AfiliatePage from './components/pages/Afiliate/page';
import ContactPage from './components/pages/Contact/page';
import RouteMeta from './components/RouteMeta';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <main>
        <Features />
        <SkillsSection />
        <SuccessStories />
        <HowItWorks />
        <Testimonials />
        <CtaBanner />
        <Faqs />
        <FooterIntroReveal />
        <FooterSection />
      </main>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {loading && <Preloader text="AMZ|AUTOMATION SOLUTIONS" onFinished={() => setLoading(false)} />}

      <ScrollToTop />
      <RouteMeta />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/affiliate" element={<AfiliatePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;