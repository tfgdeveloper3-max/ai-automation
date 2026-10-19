import BrandsTrust from "@/components/BrandsTrust";
import FooterIntroReveal from "@/components/FooterIntroReveal";
import FooterSection from "@/components/FooterSection";
import AutomatedDetail from "@/components/InnerServices/Automated/AutomatedDetail";
import AutomatedFaqs from "@/components/InnerServices/Automated/AutomatedFaqs";
import AutomatedHero from "@/components/InnerServices/Automated/AutomatedHero";



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