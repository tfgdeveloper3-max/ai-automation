import AboutHero from '../../About/AboutHero';
import HowItWorks from '../../HowitWorks';
import Testimonials from '../../Testimonials';
import CtaBanner from '../../Ctasection';
import FooterIntroReveal from '../../FooterIntroReveal';
import FooterSection from '../../FooterSection';
import AboutSkills from '@/components/About/AboutSkill';

const AboutPage = () => {
    return (
        <>
            <AboutHero />
            <main>
                <AboutSkills />
                <HowItWorks />
                <Testimonials />
                <CtaBanner />
                <FooterIntroReveal />
            </main>
            <FooterSection />
        </>
    );
};

export default AboutPage;