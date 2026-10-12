import ContactSection from '@/components/Contact/Contactsection';
import FooterIntroReveal from '../../FooterIntroReveal';
import FooterSection from '../../FooterSection';

import ContactHero from '@/components/Contact/ContactHero';

const ContactPage = () => {
    return (
        <>
            <ContactHero />
            <main>
                <ContactSection />
                <FooterIntroReveal />
            </main>
            <FooterSection />
        </>
    );
};

export default ContactPage;