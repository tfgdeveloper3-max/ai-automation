import AfilitateHero from '@/components/Afiliate/AfilitateHero';
import FooterIntroReveal from '../../FooterIntroReveal';
import FooterSection from '../../FooterSection';
import AffiliateSections from '@/components/Afiliate/AfiliateSections';
import BrandsTrust from '@/components/BrandsTrust';
import Faqs from '@/components/Faqsection';

const AfiliatePage = () => {
    return (
        <>
            <AfilitateHero />
            <main>
                <AffiliateSections />
                <BrandsTrust />
                <Faqs />
                <FooterIntroReveal />
            </main>
            <FooterSection />
        </>
    );
};

export default AfiliatePage;