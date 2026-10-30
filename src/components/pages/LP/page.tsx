import LpCta from "@/components/LandingPage/LpCta";
import LpEcomServices from "@/components/LandingPage/LpEcomServices";
import LpEcosystem from "@/components/LandingPage/LpEcoSystem";
import LpFeatures from "@/components/LandingPage/LpFeatures";
import LpFooter from "@/components/LandingPage/LpFooter";
import LpHero from "@/components/LandingPage/LpHero";
import LpInvest from "@/components/LandingPage/LpInvest";
import LpNavbar from "@/components/LandingPage/LpNav";
import LpProcess from "@/components/LandingPage/LpProcess";
import LpResults from "@/components/LandingPage/LpResuts";
import LpReviews from "@/components/LandingPage/LpReviews";
import LpServices from "@/components/LandingPage/LpServices";


const LandingPage = () => {
    return (
        <>
            <LpNavbar />
            <LpHero />
            <LpProcess />
            <LpEcosystem />
            <LpServices />
            <LpResults />
            <LpEcomServices />
            <LpFeatures />
            <LpInvest />
            <LpCta />
            <LpReviews />
            <LpFooter />
        </>
    );
};

export default LandingPage;