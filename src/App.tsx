import { useEffect } from 'react';
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
import RouteMeta from './components/RouteMeta';
import LeadModalProvider from './components/LeadModalProvider';

import AboutPage from './components/pages/About/page';
import ServicePage from './components/pages/Service/page';
import AfiliatePage from './components/pages/Afiliate/page';
import ContactPage from './components/pages/Contact/page';
import ReviewsPage from './components/pages/Reviews/page';

// Inner service pages
import AiCustomerSupportPage from './components/pages/InnerServices/AI-CustomerSupport/page';
import MultiChannelPage from './components/pages/InnerServices/MultiChannel/page';
import SmartInventoryPage from './components/pages/InnerServices/SmartInventory/page';
import AutomatedPage from './components/pages/InnerServices/Automated/page';

import './styles/fonts.css';
import './App.css';
import LiveChat from './components/LiveChat';

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
      <LiveChat />
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
  return (
    <BrowserRouter>
      <LeadModalProvider>
        <ScrollToTop />
        <RouteMeta />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />

          <Route path="/service/ai-customer-support" element={<AiCustomerSupportPage />} />
          <Route path="/service/multi-channel-order-sync" element={<MultiChannelPage />} />
          <Route path="/service/smart-inventory-management" element={<SmartInventoryPage />} />
          <Route path="/service/automated-cross-selling" element={<AutomatedPage />} />

          <Route path="/affiliate" element={<AfiliatePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </LeadModalProvider>
    </BrowserRouter>
  );
}

export default App;