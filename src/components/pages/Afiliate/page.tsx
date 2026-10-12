import AfilitateHero from '@/components/Afiliate/AfilitateHero';
import FooterIntroReveal from '../../FooterIntroReveal';
import FooterSection from '../../FooterSection';
import AffiliateSections from '@/components/Afiliate/AfiliateSections';
import AfiliateFaqs from '@/components/Afiliate/AfiliateFaqs';

const AfiliatePage = () => {
    return (
        <>
            <AfilitateHero />
            <main>
                <AffiliateSections />
                <AfiliateFaqs />
                <FooterIntroReveal />
            </main>
            <FooterSection />
        </>
    );
};

export default AfiliatePage;