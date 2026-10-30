import BrandsTrust from "@/components/BrandsTrust";
import FooterIntroReveal from "@/components/FooterIntroReveal";
import FooterSection from "@/components/FooterSection";
import AutomatedDetail from "@/components/InnerServices/EbayAutomation/EbayDetail";
import AutomatedFaqs from "@/components/InnerServices/EbayAutomation/EbayFaqs";
import AutomatedHero from "@/components/InnerServices/EbayAutomation/EbayHero";



const Automated = () => {
    return (
        <>
            <AutomatedHero />
            <main>
                <AutomatedDetail />
                <BrandsTrust />
                <AutomatedFaqs />
                <FooterIntroReveal />
            </main>
            <FooterSection />
        </>
    );
};

export default Automated;