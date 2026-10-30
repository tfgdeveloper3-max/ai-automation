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

import AiCustomerSupportPage from './components/pages/InnerServices/AI-CustomerSupport/page';
import MultiChannelPage from './components/pages/InnerServices/MultiChannel/page';
import SmartInventoryPage from './components/pages/InnerServices/SmartInventory/page';
import AutomatedPage from './components/pages/InnerServices/Automated/page';

import './styles/fonts.css';
import './App.css';
import LiveChat from './components/LiveChat';
import QuickLeadSection from './components/QuickLeadSection';
import TermsAndConditions from './components/Legal/Terms-Condition';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import RefundPolicy from './components/Legal/RefundPolicy';
import LandingPage from './components/pages/LP/page';
import Etsy from './components/pages/InnerServices/EtsyAutomation/page';

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
        <QuickLeadSection />
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
      <LiveChat />
      <LeadModalProvider>
        <ScrollToTop />
        <RouteMeta />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />

          <Route path="/service/shopify-automation" element={<AiCustomerSupportPage />} />
          <Route path="/service/tiktok-automation" element={<MultiChannelPage />} />
          <Route path="/service/walmart-automation" element={<SmartInventoryPage />} />
          <Route path="/service/ebay-automation" element={<AutomatedPage />} />
          <Route path="/service/etsy-automation" element={<Etsy />} />

          <Route path="/affiliate" element={<AfiliatePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />

          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path='/automation-services' element={<LandingPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </LeadModalProvider>
    </BrowserRouter>
  );
}

export default App;