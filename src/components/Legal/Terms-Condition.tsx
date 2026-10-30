import LegalPage, { type LegalSection } from './LegalPage';

const SECTIONS: LegalSection[] = [
    {
        id: 'acceptance',
        heading: 'Acceptance of terms',
        paragraphs: [
            'By accessing or using the AMZ Automation Solutions website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.',
        ],
    },
    {
        id: 'services',
        heading: 'Our services',
        paragraphs: [
            'We provide AI-powered automation for e-commerce businesses, including workflows for Amazon, Shopify and TikTok Shop.',
        ],
        list: [
            'Order tracking and customer support automation',
            'Refund, return and exchange workflows',
            'Upsell and product recommendation flows',
            'Custom integrations agreed in writing',
        ],
    },
    {
        id: 'accounts',
        heading: 'Accounts and access',
        paragraphs: [
            'You are responsible for keeping your login details and any store or marketplace credentials you share with us secure. Let us know immediately if you suspect unauthorized access.',
        ],
    },
    {
        id: 'payments',
        heading: 'Fees and payments',
        paragraphs: [
            'Fees are listed in your proposal or invoice. Payments are due on the dates shown, and late payments may pause active automations until the balance is cleared.',
        ],
    },
    {
        id: 'client-responsibilities',
        heading: 'Your responsibilities',
        list: [
            'Comply with the policies of Amazon, Shopify, TikTok and any other platform you sell on',
            'Provide accurate business and product information',
            'Review automated customer messages before they go live',
        ],
    },
    {
        id: 'intellectual-property',
        heading: 'Intellectual property',
        paragraphs: [
            'All software, workflows and materials we create remain our property unless a written agreement says otherwise. You keep full ownership of your store data and brand assets.',
        ],
    },
    {
        id: 'liability',
        heading: 'Limitation of liability',
        paragraphs: [
            'We are not liable for losses caused by third-party platform changes, account suspensions, or outages outside our control. Our total liability is limited to the fees you paid in the three months before the claim.',
        ],
    },
    {
        id: 'termination',
        heading: 'Termination',
        paragraphs: [
            'Either party may end the service with written notice as set out in your agreement. We may suspend service immediately if these terms are breached.',
        ],
    },
    {
        id: 'changes',
        heading: 'Changes to these terms',
        paragraphs: [
            'We may update these terms from time to time. The date at the top of this page shows when they last changed.',
        ],
    },
];

const TermsAndConditions = () => (
    <LegalPage
        title="Terms & Conditions"
        updated="October 30, 2026"
        intro="These terms explain how you can use our website and automation services, and what we each agree to when we work together."
        sections={SECTIONS}
    />
);

export default TermsAndConditions;