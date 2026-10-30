import BrandsTrust from "@/components/BrandsTrust";
import FooterIntroReveal from "@/components/FooterIntroReveal";
import FooterSection from "@/components/FooterSection";
import SmartDetail from "@/components/InnerServices/WallmartAutomation/WallmartDetail";
import SmartFaqs from "@/components/InnerServices/WallmartAutomation/WallmartFaqs";
import SmartHero from "@/components/InnerServices/WallmartAutomation/WallmartHero";



const SmartInventory = () => {
    return (
        <>
            <SmartHero />
            <main>
                <SmartDetail />
                <BrandsTrust />
                <SmartFaqs />
                <FooterIntroReveal />
            </main>
            <FooterSection />
        </>
    );
};

export default SmartInventory;