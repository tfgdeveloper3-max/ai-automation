export interface ServiceLink {
    label: string;
    to: string;
    description: string;
}

export const SERVICES: ServiceLink[] = [
    {
        label: '24/7 AI Customer Support',
        to: '/service/ai-customer-support',
        description: 'Instant answers for orders, returns & FAQs',
    },
    {
        label: 'Multi-Channel Order Sync',
        to: '/service/multi-channel-order-sync',
        description: 'Returns, labels & order status in real time',
    },
    {
        label: 'Smart Inventory Management',
        to: '/service/smart-inventory-management',
        description: 'Prevent stockouts and over-selling',
    },
    {
        label: 'Automated Cross-Selling',
        to: '/service/automated-cross-selling',
        description: 'Personalised offers that grow order value',
    },
];