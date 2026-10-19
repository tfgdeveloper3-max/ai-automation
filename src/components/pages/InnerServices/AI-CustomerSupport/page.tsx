import BrandsTrust from "@/components/BrandsTrust";
import FooterIntroReveal from "@/components/FooterIntroReveal";
import FooterSection from "@/components/FooterSection";
import AiServiceDetail from "@/components/InnerServices/AI-CustomerSupport/AiDetail";
import AiFaqs from "@/components/InnerServices/AI-CustomerSupport/AiFaqs";
import AiHero from "@/components/InnerServices/AI-CustomerSupport/AiHero";


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