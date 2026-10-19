export interface Review {
    id: string;
    name: string;
    role: string;
    image?: string;
    rating: 1 | 2 | 3 | 4 | 5;
    title: string;
    body: string;
    service?: string;
    country?: string;
    date?: string; 
    verified?: boolean;
    reply?: { body: string; date: string };
}

export const COMPANY_NAME = 'AMZ Automation Solutions';

const IMG_EXT = '.png';
const img = (name: string) => `/images/${name.trim().replace(/\s+/g, '-')}${IMG_EXT}`;

const SERVICE = {
    support: '24/7 AI Customer Support',
    orders: 'Multi-Channel Order Sync',
    inventory: 'Smart Inventory Management',
    upsell: 'Automated Cross-Selling',
} as const;

export const REVIEWS: Review[] = [
    {
        id: 'perin-rames',
        name: 'Perin Rames',
        role: 'Head of Operations, ZE Logistics',
        image: img('Perin Rames'),
        rating: 5,
        title: 'Weekend support backlogs, gone',
        body: 'The 24/7 AI Customer Support feature has eliminated our weekend support backlogs completely. Our response times went from hours to seconds, and our customer satisfaction score shot up by 35% in the first month.',
        service: SERVICE.support,
    },
    {
        id: 'aiden-cole',
        name: 'Aiden Cole',
        role: 'Product Lead, Nexa Apparel',
        image: img('Aiden Cole'),
        rating: 5,
        title: 'Hundreds of manual hours saved in peak season',
        body: 'Automating our order routing and return portal saved us hundreds of manual processing hours during peak season. Returns are handled smoothly, and our buyers love the instant tracking updates.',
        service: SERVICE.orders,
    },
    {
        id: 'sophia-martinez',
        name: 'Sophia Martinez',
        role: 'E-Commerce Manager, Kova Living',
        image: img('Sophia Martinez'),
        rating: 5,
        title: 'No more overselling across channels',
        body: 'Overselling across Amazon and Shopify used to be our biggest headache. AMZ Automation\u2019s real-time inventory pipelines keep every channel synced down to the second. We haven\u2019t had a stock mismatch since.',
        service: SERVICE.inventory,
    },
    {
        id: 'liam-oconnor',
        name: 'Liam O\u2019Connor',
        role: 'Founder, Peak Performance Gear',
        image: img("Liam-Connor"),
        rating: 5,
        title: 'AOV up $14 and $18k recovered in a month',
        body: 'The post-purchase upsell workflows immediately bumped our Average Order Value by $14. The dynamic cart recovery sequences alone generated an extra $18k in captured revenue last month!',
        service: SERVICE.upsell,
    },
    {
        id: 'chloe-bennet',
        name: 'Chloe Bennet',
        role: 'Operations Director, Artisan House',
        image: img('Chloe Bennet'),
        rating: 5,
        title: 'Live within 48 hours, without a glitch',
        body: 'The onboarding engineering team was incredible. They held our hand through every single integration step, customized the API bridges for our warehouse, and had us live within 48 hours without a glitch.',
    },
    {
        id: 'jason-patel',
        name: 'Jason Patel',
        role: 'Co-Founder, Lumen Tech',
        image: img('Jason Patel'),
        rating: 5,
        title: 'Technical depth with genuine care',
        body: 'Whenever we need a custom rule tweak or new workflow added, their tech team responds in minutes. You rarely find an agency that combines deep technical knowledge with this level of genuine customer care.',
    },
    {
        id: 'rachel-adams',
        name: 'Rachel Adams',
        role: 'VP of Sales, PureBeauty Co.',
        image: img('Rachel Adams'),
        rating: 5,
        title: 'An extension of our own team',
        body: 'AMZ Automation feels less like a vendor and more like an extension of our internal team. They proactively audit our flows and suggest optimization tweaks that continuously drive down our operational overhead.',
    },
    {
        id: 'tariq-sterling',
        name: 'Tariq Sterling',
        role: 'Head of E-Commerce, Volt Athletics',
        image: img('Tariq Sterling'),
        rating: 5,
        title: 'Legacy ERP connected to TikTok Shop',
        body: 'Their developers built custom integrations connecting our legacy ERP directly to TikTok Shop. The attention to detail and zero-downtime execution proved we picked the right automation partner.',
        service: SERVICE.orders,
    },
    {
        id: 'maya-lin',
        name: 'Maya Lin',
        role: 'CEO, Horizon Home',
        image: img('Maya Lin'),
        rating: 5,
        title: 'Tripled sales volume with the same lean team',
        body: 'Scaling to Amazon, Shopify, and TikTok simultaneously would have required hiring three new full-time ops reps. AMZ Automation allowed us to triple our sales volume with our existing lean team.',
    },
    {
        id: 'derek-vance',
        name: 'Derek Vance',
        role: 'Founder, Trailhead Supply',
        image: img('Derek Vance'),
        rating: 5,
        title: 'Hours back every single day',
        body: 'AMZ Automation completely transformed how we run our storefronts. Having support, inventory, and order routing all working together automatically has given us back hours every single day.',
    },
    {
        id: 'samantha-wright',
        name: 'Samantha Wright',
        role: 'Managing Director, Elevate Retail',
        image: img('Samantha Wright'),
        rating: 5,
        title: 'Paid for itself in under two weeks',
        body: 'Partnering with AMZ Automation paid for itself in less than two weeks. The combination of reduced labor costs and recovered abandoned carts gave our margins an immediate, noticeable boost.',
        service: SERVICE.upsell,
    },
    {
        id: 'carlos-mendez',
        name: 'Carlos Mendez',
        role: 'Founder, Urban Edge',
        image: img('Carlos Mendez'),
        rating: 5,
        title: 'Finally focused on strategy, not fires',
        body: 'Knowing our inventory sync, returns, and customer inquiries are running smoothly 24/7 on autopilot allows me to finally focus on product sourcing and high-level strategy instead of putting out daily fires.',
    },
];