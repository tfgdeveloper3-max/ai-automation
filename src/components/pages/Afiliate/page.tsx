import AfilitateHero from '@/components/Afiliate/AfilitateHero';
import FooterIntroReveal from '../../FooterIntroReveal';
import FooterSection from '../../FooterSection';
import AffiliateSections from '@/components/Afiliate/AfiliateSections';
import AfiliateFaqs from '@/components/Afiliate/AfiliateFaqs';
import BrandsTrust from '@/components/BrandsTrust';

const AfiliatePage = () => {
    return (
        <>
            <AfilitateHero />
            <main>
                <AffiliateSections />
                <BrandsTrust />
                <AfiliateFaqs />
                <FooterIntroReveal />
            </main>
            <FooterSection />
        </>
    );
};

export default AfiliatePage;