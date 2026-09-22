import { useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import SkillsSection from './components/SkillsSection';
import './styles/fonts.css';
import './App.css';
import SuccessStories from './components/caseStudy';
import HowItWorks from './components/HowitWorks';
import Testimonials from './components/Testimonials';
import CtaBanner from './components/Ctasection';
import Faqs from './components/Faqsection';
import FooterIntroReveal from './components/FooterIntroReveal';
import FooterSection from './components/FooterSection';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <Preloader text="AI AUTOMATION" onFinished={() => setLoading(false)} />
      )}

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

export default App;