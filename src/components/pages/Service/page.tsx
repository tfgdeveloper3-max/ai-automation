import CtaBanner from '../../Ctasection';
import FooterIntroReveal from '../../FooterIntroReveal';
import FooterSection from '../../FooterSection';
import ServiceHero from '@/components/Service/ServicesHero';
import ServiceFeatures from '@/components/Service/ServicesFeatures';
import ServiceFaqs from '@/components/Service/ServicesFAQ';
import ServicesStories from '@/components/Service/ServicesCase';

const ServicePage = () => {
    return (
        <>
            <ServiceHero />
            <main>
                <ServiceFeatures />
                <ServicesStories />
                <CtaBanner />
                <ServiceFaqs />
                <FooterIntroReveal />
            </main>
            <FooterSection />
        </>
    );
};

export default ServicePage;