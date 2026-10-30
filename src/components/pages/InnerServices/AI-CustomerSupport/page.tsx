import BrandsTrust from "@/components/BrandsTrust";
import FooterIntroReveal from "@/components/FooterIntroReveal";
import FooterSection from "@/components/FooterSection";
import AiServiceDetail from "@/components/InnerServices/ShopifyAutomation/ShopifyDetail";
import AiFaqs from "@/components/InnerServices/ShopifyAutomation/ShopifyFaqs";
import AiHero from "@/components/InnerServices/ShopifyAutomation/ShopifyHero";


const CustomerSupport = () => {
    return (
        <>
            <AiHero />
            <main>
                <AiServiceDetail />
                <BrandsTrust />
                <AiFaqs />
                <FooterIntroReveal />

            </main>
            <FooterSection />
        </>
    );
};

export default CustomerSupport;