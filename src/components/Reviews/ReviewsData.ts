/*
 * ⚠️ PLACEHOLDER REVIEWS — replace with your REAL customer reviews before going live.
 * Publishing invented reviews is illegal in many countries (e.g. the US FTC rule on fake reviews, UK DMCC Act).
 * Ideally load these from your review provider (Trustpilot API, Google, your own DB).
 */

export interface Review {
    id: string;
    name: string;
    country: string; // 2-letter code, e.g. "US"
    reviewsCount: number; // how many reviews this person has written
    rating: 1 | 2 | 3 | 4 | 5;
    title: string;
    body: string;
    date: string; // ISO date the review was posted
    experienceDate: string; // ISO date of the experience
    verified: boolean;
    service: string;
    reply?: { body: string; date: string };
}

export const COMPANY_NAME = 'AMZ Automation Solutions';

export const REVIEWS: Review[] = [
    {
        id: 'r1',
        name: 'Daniel Brooks',
        country: 'US',
        reviewsCount: 3,
        rating: 5,
        title: 'Support tickets dropped by more than half',
        body: 'We were drowning in “where is my order” messages every morning. Since the AI support went live, most of those are answered instantly and my team only handles the tricky cases. Setup was smooth and the account manager checked in every week.',
        date: '2026-10-12',
        experienceDate: '2026-09-28',
        verified: true,
        service: '24/7 AI Customer Support',
    },
    {
        id: 'r2',
        name: 'Sana Malik',
        country: 'GB',
        reviewsCount: 1,
        rating: 5,
        title: 'Finally no more over-selling',
        body: 'Our stock now syncs between Shopify and Amazon automatically. We used to cancel a few orders every week because of mismatched inventory. That has completely stopped.',
        date: '2026-10-08',
        experienceDate: '2026-09-30',
        verified: true,
        service: 'Smart Inventory Management',
    },
    {
        id: 'r3',
        name: 'Marcus Lee',
        country: 'CA',
        reviewsCount: 7,
        rating: 4,
        title: 'Great results, onboarding took a bit longer',
        body: 'The cross-selling flows are already lifting our average order value. Onboarding took about a week longer than planned because of our custom TikTok Shop setup, but the team kept us updated the whole time.',
        date: '2026-10-03',
        experienceDate: '2026-09-15',
        verified: true,
        service: 'Automated Cross-Selling',
    },
    {
        id: 'r4',
        name: 'Aisha Khan',
        country: 'AE',
        reviewsCount: 2,
        rating: 5,
        title: 'Returns are handled while I sleep',
        body: 'Return requests now get a label automatically and the order status updates on every channel. Customers love the speed and I get my evenings back.',
        date: '2026-09-27',
        experienceDate: '2026-09-20',
        verified: true,
        service: 'Multi-Channel Order Sync',
    },
    {
        id: 'r5',
        name: 'Tom Walker',
        country: 'AU',
        reviewsCount: 1,
        rating: 5,
        title: 'Responsive and knowledgeable team',
        body: 'Every question I had was answered the same day. They clearly understand Amazon wholesale and explained everything in plain language.',
        date: '2026-09-21',
        experienceDate: '2026-09-10',
        verified: false,
        service: '24/7 AI Customer Support',
    },
    {
        id: 'r6',
        name: 'Elena García',
        country: 'ES',
        reviewsCount: 4,
        rating: 3,
        title: 'Good service, reporting could be clearer',
        body: 'The automation itself works well. I would like the weekly report to be easier to read, it took me a while to understand which numbers matter.',
        date: '2026-09-14',
        experienceDate: '2026-09-01',
        verified: true,
        service: 'Smart Inventory Management',
        reply: {
            body: 'Thank you for the honest feedback, Elena. We have just released a simplified weekly report with a one-page summary and sent it to your inbox. Your account manager will walk you through it on your next call.',
            date: '2026-09-15',
        },
    },
    {
        id: 'r7',
        name: 'Bilal Ahmed',
        country: 'PK',
        reviewsCount: 2,
        rating: 5,
        title: 'Worth every penny',
        body: 'We launched on TikTok Shop with their help and the automated replies handled the launch-day rush without a single missed message.',
        date: '2026-09-08',
        experienceDate: '2026-08-30',
        verified: true,
        service: '24/7 AI Customer Support',
    },
    {
        id: 'r8',
        name: 'Hannah Schmidt',
        country: 'DE',
        reviewsCount: 5,
        rating: 4,
        title: 'Solid automation, very professional',
        body: 'Professional from the first call. The order sync is reliable and we have not had a single wrong status since switching.',
        date: '2026-08-29',
        experienceDate: '2026-08-20',
        verified: true,
        service: 'Multi-Channel Order Sync',
    },
    {
        id: 'r9',
        name: 'Chris Morgan',
        country: 'US',
        reviewsCount: 1,
        rating: 2,
        title: 'Slow first reply from sales',
        body: 'It took three days to hear back after I filled in the contact form. Once we got going things improved, but the first impression was not great.',
        date: '2026-08-22',
        experienceDate: '2026-08-12',
        verified: false,
        service: 'Automated Cross-Selling',
        reply: {
            body: 'Hi Chris, we are sorry about the slow first response. We have since added live chat and an automatic call-back booking so new enquiries are answered within one business day. Thank you for sticking with us.',
            date: '2026-08-23',
        },
    },
    {
        id: 'r10',
        name: 'Priya Nair',
        country: 'IN',
        reviewsCount: 3,
        rating: 5,
        title: 'Our repeat purchases went up',
        body: 'The personalised product suggestions after checkout are spot on. Customers come back with discount codes that actually match what they bought before.',
        date: '2026-08-15',
        experienceDate: '2026-08-01',
        verified: true,
        service: 'Automated Cross-Selling',
    },
    {
        id: 'r11',
        name: 'Oliver Smith',
        country: 'GB',
        reviewsCount: 6,
        rating: 5,
        title: 'Set it up once and it just works',
        body: 'Three months in and the system runs on its own. The team proactively suggested two improvements we had not even thought about.',
        date: '2026-08-04',
        experienceDate: '2026-07-25',
        verified: true,
        service: 'Smart Inventory Management',
    },
    {
        id: 'r12',
        name: 'Fatima Noor',
        country: 'SA',
        reviewsCount: 1,
        rating: 5,
        title: 'Excellent communication throughout',
        body: 'Clear timeline, weekly updates and quick answers on WhatsApp. I always knew what was happening with my store.',
        date: '2026-07-28',
        experienceDate: '2026-07-18',
        verified: true,
        service: 'Multi-Channel Order Sync',
    },
];