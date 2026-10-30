import BrandsTrust from "@/components/BrandsTrust";
import FooterIntroReveal from "@/components/FooterIntroReveal";
import FooterSection from "@/components/FooterSection";
import MultiDetail from "@/components/InnerServices/TikTokAutomation/TikTokDetail";
import MultiFaqs from "@/components/InnerServices/TikTokAutomation/TikTokFaqs";
import MultiHero from "@/components/InnerServices/TikTokAutomation/TikTokHero";



const MultiChannel = () => {
    return (
        <>
            <MultiHero />
            <main>
                <MultiDetail />
                <BrandsTrust />
                <MultiFaqs />
                <FooterIntroReveal />
            </main>
            <FooterSection />
        </>
    );
};

export default MultiChannel;