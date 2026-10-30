import { useState, type CSSProperties, type FocusEvent, type JSX } from 'react';
import { Link } from 'react-router-dom';
import { useSectionReveal } from './usesectionreveal';


interface FeatureCard {
    title: string;
    description: string;
    icon: JSX.Element;
    href: string;
    highlight?: boolean;
}

const GREEN = '#8ac44b';





/* ---------- Service icons (related to each platform, not their logos) ---------- */

/* Shopify: shopping bag with an automation spark */
const ShopBagIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <path d="M9 15h30l-2.5 27H11.5L9 15Z" />
        <path d="M17 19v-6a7 7 0 0 1 14 0v6" />
        <g stroke={GREEN}>
            <path d="M25.5 23l-5 8h5l-2 7 6-9h-5l2-6" />
        </g>
    </svg>
);

/* TikTok Shop: phone with live video + cart */
const LivePhoneIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <rect x="12" y="3" width="24" height="42" rx="4" />
        <path d="M21 7h6" />
        <path d="M22 40h4" />
        <g stroke={GREEN}>
            <rect x="15.5" y="11" width="10" height="5" rx="2.5" />
            <circle cx="18.5" cy="13.5" r="0.8" fill={GREEN} />
            <path d="M21 24.5v9l7.5-4.5L21 24.5Z" />
        </g>
        <path d="M38 14c2 1.5 3 3.5 3 6s-1 4.5-3 6M41.5 10c3 2.5 4.5 6 4.5 10s-1.5 7.5-4.5 10" />
    </svg>
);

/* Walmart: store with an approval check */
const StoreCheckIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <path d="M5 18l4-10h30l4 10" />
        <path d="M5 18c0 2.8 2.2 4.5 4.8 4.5S14.6 20.8 14.6 18c0 2.8 2.2 4.5 4.8 4.5s4.6-1.7 4.6-4.5c0 2.8 2.2 4.5 4.8 4.5s4.6-1.7 4.6-4.5c0 2.8 2.2 4.5 4.8 4.5S43 20.8 43 18" />
        <path d="M8 22.5V42h20M40 22.5V28" />
        <path d="M14 42V31h8v11" />
        <g stroke={GREEN}>
            <circle cx="37" cy="37" r="7.5" />
            <path d="m33.5 37 2.5 2.5 4.5-5" />
        </g>
    </svg>
);

/* eBay: price tag with repricing arrows */
const RepriceTagIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <path d="M4 22V6h16l20 20-16 16L4 22Z" />
        <circle cx="12" cy="14" r="2.5" />
        <g stroke={GREEN}>
            <path d="M19 26.5c0-2 1.6-3.5 3.6-3.5h2.4M27 26.5c0 2-1.6 3.5-3.6 3.5H21" />
            <path d="M23.5 21l2 2-2 2M22.5 32l-2-2 2-2" />
        </g>
        <path d="M38 8h6M41 5v6" />
    </svg>
);

/* Etsy: handmade item (yarn + needle) with an SEO search lens */
const HandmadeSeoIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <circle cx="18" cy="20" r="13" />
        <path d="M8 13c6 1 13 5 17 13M6.5 21c6 0 12 3 15 10M13 8.5c6 3 10 9 11 17" />
        <path d="M27 6l-9 9" />
        <circle cx="28.5" cy="4.5" r="1.4" />
        <g stroke={GREEN}>
            <circle cx="35" cy="35" r="6.5" />
            <path d="m39.8 39.8 5 5" />
        </g>
    </svg>
);

const INTRO_PARAGRAPH =
    'Empower your digital portfolio with turnkey management frameworks designed to scale your revenue across top online marketplaces effortlessly with AMZ Automation.';

const CARDS: FeatureCard[] = [
    {
        title: 'Shopify Automation',
        description:
            'Launch a bespoke, professionally branded Shopify storefront powered by automated fulfillment and high-converting sales funnels.',
        icon: <ShopBagIcon />,
        href: '/service/shopify-automation',
    },
    {
        title: 'TikTok Shop Automation',
        description:
            'Capture massive live-selling traffic and viral video momentum with our end-to-end TikTok social commerce management.',
        icon: <LivePhoneIcon />,
        href: '/service/tiktok-shop-automation',
        highlight: true,
    },
    {
        title: 'Walmart Automation',
        description:
            "Secure hassle-free marketplace approval and scale your catalog across Walmart's high-intent buyer network.",
        icon: <StoreCheckIcon />,
        href: '/service/walmart-automation',
    },
    {
        title: 'eBay Automation',
        description:
            'Tap into decades of customer trust on eBay with algorithmic repricing and fully managed inventory workflows.',
        icon: <RepriceTagIcon />,
        href: '/service/ebay-automation',
    },
    {
        title: 'Etsy Automation',
        description:
            'Maximize visibility for unique creative or vintage goods using specialized SEO tagging and hands-free upkeep.',
        icon: <HandmadeSeoIcon />,
        href: '/service/etsy-automation',
    },
];

/* Grid placement: 6-column grid on desktop, each card spans 2.
   Top row = cards 1-3, bottom row = cards 4-5 centered.
   On tablet (2 columns) the last card sits centered on its own row. */
const PLACEMENT = [
    'lg:col-span-2',
    'lg:col-span-2',
    'lg:col-span-2',
    'lg:col-span-2 lg:col-start-2',
    'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-12px)] lg:col-span-2 lg:col-start-4 lg:mx-0 lg:w-auto',
];

/* The card that is dark by default (the one with highlight: true) */
const DEFAULT_ACTIVE = Math.max(0, CARDS.findIndex((c) => c.highlight));

const HALFTONE: CSSProperties = {
    backgroundImage: 'radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1.3px)',
    backgroundSize: '6px 6px',
    WebkitMaskImage: 'radial-gradient(120% 90% at 100% 100%, #000 0%, transparent 65%)',
    maskImage: 'radial-gradient(120% 90% at 100% 100%, #000 0%, transparent 65%)',
};

const Features = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });

    const [active, setActive] = useState(DEFAULT_ACTIVE);
    const reset = () => setActive(DEFAULT_ACTIVE);

    const handleGridBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) reset();
    };

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`,
        style: { transitionDelay: `${i * 120}ms` } as CSSProperties,
    });

    return (
        <section ref={ref} className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="mx-auto w-full max-w-[1200px]">
                <div
                    className={`flex flex-col gap-6 md:flex-row md:items-start md:justify-between ${reveal(0).className}`}
                    style={reveal(0).style}
                >
                    <div>
                        <span className="inline-flex rounded-full bg-[#8ac44b] px-8 py-1.5 font-['Montserrat',sans-serif] text-xs font-medium text-white sm:text-[13px]">
                            What We Can Do
                        </span>
                        <h2 className="mt-3 font-['DM_Sans',sans-serif] text-[32px] font-normal leading-[1.2] text-[#111111] sm:text-[40px] lg:text-[48px]">
                            <span className="font-semibold">Comprehensive E-Commerce</span>
                            <br />
                            Automation Solutions
                        </h2>
                    </div>

                    <p className="max-w-[400px] border-l-[3px] border-[#8ac44b] pl-4 font-['Montserrat',sans-serif] text-[16px] leading-relaxed text-[#6b6b7a] md:mt-9">
                        {INTRO_PARAGRAPH}
                    </p>
                </div>

                <div
                    className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-6 xl:gap-7"
                    onMouseLeave={reset}
                    onBlur={handleGridBlur}
                >
                    {CARDS.map((card, i) => {
                        const r = reveal(i + 1);
                        const on = active === i;

                        return (
                            <div
                                key={card.title}
                                className={`${PLACEMENT[i]} ${r.className}`}
                                style={r.style}
                                onMouseEnter={() => setActive(i)}
                                onFocus={() => setActive(i)}
                            >
                                <article
                                    className={`relative isolate h-full overflow-hidden border px-8 pb-9 pt-9 transition-all duration-500 ${on
                                        ? 'rounded-md border-transparent bg-[#1d1650] shadow-[0_20px_40px_rgba(29,22,80,0.25)]'
                                        : 'rounded-xl border-gray-100 bg-white shadow-[0_6px_10px_-2px_rgba(15,10,50,0.16)]'
                                        }`}
                                >
                                    <div
                                        aria-hidden="true"
                                        className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`}
                                        style={HALFTONE}
                                    />

                                    <div className="relative z-10">
                                        <div className={`h-14 w-14 transition-colors duration-500 ${on ? 'text-[#4f8cff]' : 'text-[#2b2b3a]'}`}>
                                            {card.icon}
                                        </div>

                                        <h3
                                            className={`mt-6 font-['Anybody',sans-serif] text-base font-bold transition-colors duration-500 ${on ? 'text-white' : 'text-[#1d1650]'
                                                }`}
                                        >
                                            {card.title}
                                        </h3>

                                        <p
                                            className={`mt-3 font-['Montserrat',sans-serif] text-[16px] leading-[1.65] transition-colors duration-500 ${on ? 'text-white/70' : 'text-[#7b7b8a]'
                                                }`}
                                        >
                                            {card.description}
                                        </p>

                                        <Link
                                            to={card.href}
                                            aria-label={`Read more about ${card.title}`}
                                            className="mt-5 inline-flex items-center gap-1.5 font-['Montserrat',sans-serif] text-[13px] font-medium text-[#8ac44b] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b]"
                                        >
                                            Read More
                                            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <path d="M9 6l6 6-6 6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;