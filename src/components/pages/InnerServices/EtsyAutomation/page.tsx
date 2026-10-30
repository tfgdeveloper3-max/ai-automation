import BrandsTrust from "@/components/BrandsTrust";
import FooterIntroReveal from "@/components/FooterIntroReveal";
import FooterSection from "@/components/FooterSection";
import EtsyServiceDetail from "@/components/InnerServices/EtsyAutomation/EtsyDetail";
import EtsyFaqs from "@/components/InnerServices/EtsyAutomation/EtsyFaqs";
import EtsyHero from "@/components/InnerServices/EtsyAutomation/EtsyHero";



const Etsy = () => {
    return (
        <>
            <EtsyHero />
            <main>
                <EtsyServiceDetail />
                <BrandsTrust />
                <EtsyFaqs />
                <FooterIntroReveal />
            </main>
            <FooterSection />
        </>
    );
};

export default Etsy;