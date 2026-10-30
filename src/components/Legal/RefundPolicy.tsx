import LegalPage, { type LegalSection } from './LegalPage';

const SECTIONS: LegalSection[] = [
    {
        id: 'overview',
        heading: 'Overview',
        paragraphs: [
            'We want you to be happy with our automation services. This policy explains when refunds are available and how to request one.',
        ],
    },
    {
        id: 'eligibility',
        heading: 'Refund eligibility',
        paragraphs: ['You may be eligible for a refund if:'],
        list: [
            'You request it within 14 days of your first payment',
            'Work on your automation has not yet started',
            'We are unable to deliver the agreed service',
        ],
    },
    {
        id: 'non-refundable',
        heading: 'Non-refundable items',
        list: [
            'Setup and onboarding fees once work has begun',
            'Monthly subscription periods that have already started',
            'Third-party costs such as software licences or platform fees',
            'Custom development that has been delivered and approved',
        ],
    },
    {
        id: 'how-to-request',
        heading: 'How to request a refund',
        paragraphs: [
            'Email support@amzautomationsolutions.com with your name, invoice number and the reason for your request. We will reply within 2 business days.',
        ],
    },
    {
        id: 'processing',
        heading: 'Processing time',
        paragraphs: [
            'Approved refunds are sent to your original payment method within 5 to 10 business days. Your bank may take a few extra days to show it.',
        ],
    },
    {
        id: 'cancellations',
        heading: 'Cancellations',
        paragraphs: [
            'You can cancel a monthly plan at any time. Your automations stay active until the end of the current billing period, and you will not be charged again.',
        ],
    },
    {
        id: 'refund-changes',
        heading: 'Changes to this policy',
        paragraphs: [
            'We may update this policy from time to time. The date at the top of this page shows when it last changed.',
        ],
    },
];

const RefundPolicy = () => (
    <LegalPage
        title="Refund Policy"
        updated="October 30, 2026"
        intro="This policy explains when you can get a refund for our services, what isn't refundable, and how long refunds take."
        sections={SECTIONS}
    />
);

export default RefundPolicy;