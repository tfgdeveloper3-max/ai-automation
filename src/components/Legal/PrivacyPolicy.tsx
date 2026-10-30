import LegalPage, { type LegalSection } from './LegalPage';

const SECTIONS: LegalSection[] = [
    {
        id: 'information-we-collect',
        heading: 'Information we collect',
        paragraphs: ['We collect information you give us and information created when you use our services.'],
        list: [
            'Contact details such as your name, email and phone number',
            'Business details you share through our forms',
            'Store and order data needed to run your automations',
            'Basic usage data such as pages visited and browser type',
        ],
    },
    {
        id: 'how-we-use',
        heading: 'How we use your information',
        list: [
            'To respond to your enquiries and provide our services',
            'To build, run and improve your automation workflows',
            'To send service updates and, with your consent, marketing emails',
            'To meet legal and security obligations',
        ],
    },
    {
        id: 'sharing',
        heading: 'Sharing your information',
        paragraphs: [
            'We do not sell your personal information. We only share it with trusted providers who help us run our services, such as hosting, email and CRM tools, and only as much as they need.',
        ],
    },
    {
        id: 'cookies',
        heading: 'Cookies',
        paragraphs: [
            'Our website uses cookies to remember your preferences and understand how visitors use the site. You can turn cookies off in your browser settings.',
        ],
    },
    {
        id: 'data-security',
        heading: 'Data security',
        paragraphs: [
            'We use encryption, access controls and regular reviews to protect your data. No system is completely secure, so we cannot guarantee absolute security.',
        ],
    },
    {
        id: 'retention',
        heading: 'Data retention',
        paragraphs: [
            'We keep your information only as long as needed to provide our services or meet legal requirements, then delete or anonymize it.',
        ],
    },
    {
        id: 'your-rights',
        heading: 'Your rights',
        paragraphs: ['Depending on where you live, you may have the right to:'],
        list: [
            'Access the personal information we hold about you',
            'Ask us to correct or delete your information',
            'Opt out of marketing emails at any time',
        ],
    },
    {
        id: 'policy-changes',
        heading: 'Changes to this policy',
        paragraphs: [
            'We may update this policy from time to time. The date at the top of this page shows when it last changed.',
        ],
    },
];

const PrivacyPolicy = () => (
    <LegalPage
        title="Privacy Policy"
        updated="October 30, 2026"
        intro="This policy explains what information we collect, how we use it, and the choices you have about your data."
        sections={SECTIONS}
    />
);

export default PrivacyPolicy;