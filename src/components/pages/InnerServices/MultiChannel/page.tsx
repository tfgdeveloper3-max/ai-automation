import BrandsTrust from "@/components/BrandsTrust";
import FooterIntroReveal from "@/components/FooterIntroReveal";
import FooterSection from "@/components/FooterSection";
import MultiDetail from "@/components/InnerServices/MultiChannel/MultiDetail";
import MultiFaqs from "@/components/InnerServices/MultiChannel/MultiFaqs";
import MultiHero from "@/components/InnerServices/MultiChannel/MultiHero";



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