import BrandsTrust from "@/components/BrandsTrust";
import FooterIntroReveal from "@/components/FooterIntroReveal";
import FooterSection from "@/components/FooterSection";
import SmartDetail from "@/components/InnerServices/SmartInventory/SmartDetail";
import SmartFaqs from "@/components/InnerServices/SmartInventory/SmartFaqs";
import SmartHero from "@/components/InnerServices/SmartInventory/SmartHero";



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