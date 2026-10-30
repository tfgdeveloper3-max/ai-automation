import { useEffect, useRef, type CSSProperties } from 'react';
import { useSectionReveal } from '../usesectionreveal';

const RATING = { score: 4.9, count: 120, sourceLabel: 'Trustpilot' };

const TRUSTBOX = {
    businessUnitId: '',
    templateId: '',
};

type Review = {
    name: string;
    service: string;
    date: string;
    rating: number;
    title: string;
    text: string;
};

const REVIEWS: Review[] = [
    {
        name: 'Marcus Vance',
        service: 'Walmart Automation',
        date: '2026',
        rating: 5,
        title: 'Seamless Walmart Growth',
        text: 'Getting approved on Walmart used to feel impossible. The AMZ Automation team handled everything from storefront setup to inventory handling, and my store is already generating steady daily sales!',
    },
    {
        name: 'Sarah Jenkins',
        service: 'Shopify Automation',
        date: '2026',
        rating: 5,
        title: 'Incredible Branded Store',
        text: 'I wanted my own custom Shopify brand without dealing with website design or supply chain nightmares. AMZ Automation built a stunning store and the orders have been rolling in automatically.',
    },
    {
        name: 'David K.',
        service: 'TikTok Shop Automation',
        date: '2026',
        rating: 5,
        title: 'Viral Sales Are Real!',
        text: 'TikTok Shop is moving faster than any other platform right now. Thanks to the AMZ Automation team tapping into trending products and creator support, my store blew up in week three.',
    },
    {
        name: 'Elena Rostova',
        service: 'eBay Automation',
        date: '2026',
        rating: 5,
        title: 'True Hands-Free Income',
        text: 'The eBay automation service has been a game-changer for my portfolio. Their algorithmic pricing and automated order fulfillment mean I barely have to check my dashboard.',
    },
    {
        name: "Liam O'Connor",
        service: 'Etsy Automation',
        date: '2026',
        rating: 5,
        title: 'Perfect Niche Scaling',
        text: 'Managing SEO and tags on Etsy was overwhelming until I handed it over to AMZ Automation. Their team optimized my whole inventory catalog and buyer traffic has scaled drastically.',
    },
    {
        name: 'Jessica Taylor',
        service: 'Multi-Channel Automation',
        date: '2026',
        rating: 5,
        title: 'Life-Changing Passive Revenue',
        text: 'I was skeptical about e-commerce automation companies, but AMZ Automation proved their system works. Communication is transparent and my monthly profits keep climbing.',
    },
    {
        name: 'Robert Chen',
        service: 'Walmart Automation',
        date: '2026',
        rating: 5,
        title: 'Professional and Efficient',
        text: 'Their Walmart automation expertise saved me months of trial and error. The onboarding was smooth, and the team manages day-to-day customer service flawlessly.',
    },
    {
        name: 'Amanda Moore',
        service: 'Shopify Automation',
        date: '2026',
        rating: 5,
        title: 'Exceptional Store Build',
        text: 'The design team behind Shopify Automation at AMZ Automation knows how to convert visitors into buyers. Clean funnels, great products, and zero stress on my end.',
    },
    {
        name: 'Brandon Cole',
        service: 'TikTok Shop Automation',
        date: '2026',
        rating: 5,
        title: 'Blew Past My Goals',
        text: 'I wanted to capture the live-selling wave on TikTok without learning video editing. AMZ Automation took total control, and my store hit profitability faster than promised.',
    },
    {
        name: 'Rachel Green',
        service: 'eBay Automation',
        date: '2026',
        rating: 5,
        title: 'Consistent Daily Orders',
        text: 'eBay has been a steady cash flow engine thanks to these guys. Product research and repricing are entirely automated. Highly recommend AMZ Automation to anyone!',
    },
    {
        name: 'Kevin Patel',
        service: 'Etsy Automation',
        date: '2026',
        rating: 5,
        title: 'Superb Support & Results',
        text: 'Finding a team that understands Etsy algorithms is rare. AMZ Automation completely turned my shop around with strategic tagging and continuous listing optimization.',
    },
    {
        name: 'Daniel Wright',
        service: 'Enterprise Automation',
        date: '2026',
        rating: 5,
        title: 'The Best Investment Choice',
        text: 'If you want a truly hands-off digital asset that generates income outside of the stock market, AMZ Automation is the partner you need. Worth every single penny.',
    },
];

/* ============================================================ */

const Star = ({ filled = true, className = 'h-4 w-4' }: { filled?: boolean; className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
            d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8L12 2.8Z"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
        />
    </svg>
);

const Stars = ({ rating, className }: { rating: number; className?: string }) => (
    <span className="flex gap-0.5 text-[#8ac44b]" role="img" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} filled={n <= Math.round(rating)} className={className} />
        ))}
    </span>
);

const VerifiedIcon = () => (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M12 2l2.4 1.8 3 .1 1 2.8 2.4 1.9-.9 2.9.9 2.9-2.4 1.9-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8-2.4-1.9.9-2.9-.9-2.9 2.4-1.9 1-2.8 3-.1L12 2Z" fill="currentColor" />
        <path d="m8.5 12.2 2.3 2.3 4.7-4.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const initials = (name: string) =>
    name
        .replace(/[^A-Za-z\s]/g, '')
        .split(/\s+/)
        .filter(Boolean)
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

const ReviewCard = ({ r }: { r: Review }) => (
    <article className="group flex h-full w-[300px] shrink-0 flex-col rounded-[22px] border border-[#2f2169]/10 bg-white p-6 shadow-[0_10px_30px_rgba(15,5,49,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#8ac44b]/60 hover:shadow-[0_24px_50px_rgba(15,5,49,0.14)] sm:w-[360px]">
        <div className="flex items-center justify-between">
            <Stars rating={r.rating} />
            <span className="font-['Montserrat',sans-serif] text-[11px] text-[#9a9aa8]">{r.date}</span>
        </div>

        <h3 className="mt-4 font-['Anybody',sans-serif] text-lg font-bold leading-snug text-[#0e0531]">{r.title}</h3>
        <p className="mt-2 line-clamp-5 font-['Montserrat',sans-serif] text-sm leading-relaxed text-[#4a4a5a]">{r.text}</p>

        <div className="mt-auto flex items-center gap-3 border-t border-[#2f2169]/10 pt-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2f2169] font-['Anybody',sans-serif] text-sm font-bold text-[#8ac44b] transition-transform duration-300 group-hover:scale-110">
                {initials(r.name)}
            </span>
            <span className="min-w-0">
                <span className="block truncate font-['Montserrat',sans-serif] text-sm font-semibold text-[#0e0531]">{r.name}</span>
                <span className="block truncate font-['Montserrat',sans-serif] text-xs text-[#6b6b7a]">{r.service}</span>
            </span>
            <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-[#8ac44b]/15 px-2 py-1 font-['Montserrat',sans-serif] text-[10px] font-semibold text-[#4f7a20]">
                <span className="text-[#5f9a24]">
                    <VerifiedIcon />
                </span>
                Verified client
            </span>
        </div>
    </article>
);

/* Infinite scrolling row — uses the `ribbon-scroll` keyframe already in index.css */
const MarqueeRow = ({ items, reverse = false, duration = 60 }: { items: Review[]; reverse?: boolean; duration?: number }) => (
    <div className="relative overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div
            className="flex w-max items-stretch gap-5 py-3 pr-5 animate-[ribbon-scroll_var(--dur)_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ '--dur': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' } as CSSProperties}
        >
            {[...items, ...items].map((r, i) => (
                <div key={i} aria-hidden={i >= items.length} className="flex">
                    <ReviewCard r={r} />
                </div>
            ))}
        </div>
    </div>
);

/* Official Trustpilot widget (loads Trustpilot's own script) */
const TrustBox = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!TRUSTBOX.businessUnitId) return;
        const load = () => {
            const tp = (window as unknown as { Trustpilot?: { loadFromElement: (el: HTMLElement, b: boolean) => void } }).Trustpilot;
            if (tp && ref.current) tp.loadFromElement(ref.current, true);
        };
        const existing = document.querySelector<HTMLScriptElement>('script[data-tp-bootstrap]');
        if (existing) {
            load();
            return;
        }
        const s = document.createElement('script');
        s.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
        s.async = true;
        s.dataset.tpBootstrap = 'true';
        s.onload = load;
        document.body.appendChild(s);
    }, []);

    if (!TRUSTBOX.businessUnitId) return null;

    return (
        <div
            ref={ref}
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id={TRUSTBOX.templateId}
            data-businessunit-id={TRUSTBOX.businessUnitId}
            data-style-height="52px"
            data-style-width="100%"
            data-theme="light"
        >
            <a target="_blank" rel="noopener noreferrer">
                See our reviews on Trustpilot
            </a>
        </div>
    );
};

const LpReviews = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`,
        style: { transitionDelay: `${i * 150}ms` } as CSSProperties,
    });

    const half = Math.ceil(REVIEWS.length / 2);
    const rowA = REVIEWS.slice(0, half);
    const rowB = REVIEWS.slice(half).length ? REVIEWS.slice(half) : REVIEWS;

    return (
        <section ref={ref} id="reviews" className="relative overflow-hidden bg-[#f7f7fb] py-16 sm:py-20 lg:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(138,196,75,0.14)_0%,transparent_70%)]" />

            {/* ---------- Header ---------- */}
            <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
                <div className={`flex flex-col gap-8 md:flex-row md:items-end md:justify-between ${reveal(0).className}`} style={reveal(0).style}>
                    <div className="max-w-[560px]">
                        <span className="inline-flex rounded-full bg-[#8ac44b] px-5 py-1.5 font-['Montserrat',sans-serif] text-xs font-bold text-[#0e0531]">
                            Client Reviews
                        </span>
                        <h2 className="mt-4 font-['Anybody',sans-serif] text-[32px] font-bold leading-[1.1] text-[#0e0531] sm:text-[44px] lg:text-[52px]">
                            What Our Clients Say
                        </h2>
                        <p className="mt-3 font-['Montserrat',sans-serif] text-sm leading-relaxed text-[#6b6b7a] sm:text-[15px]">
                            Real feedback from store owners running on our automation via AMZ Automation.
                        </p>
                    </div>

                    {/* Rating summary */}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-5 rounded-[22px] border border-[#2f2169]/10 bg-white px-6 py-5 shadow-[0_10px_30px_rgba(15,5,49,0.06)] transition hover:-translate-y-1 hover:border-[#8ac44b]/60 hover:shadow-[0_20px_45px_rgba(15,5,49,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b]"
                    >
                        <span className="font-['Anybody',sans-serif] text-5xl font-bold text-[#0e0531]">{RATING.score.toFixed(1)}</span>
                        <span>
                            <Stars rating={RATING.score} className="h-5 w-5" />
                            <span className="mt-1.5 block font-['Montserrat',sans-serif] text-xs text-[#6b6b7a]">
                                Based on {RATING.count}+ reviews on{' '}
                                <span className="font-semibold text-[#0e0531] underline-offset-2 group-hover:underline">{RATING.sourceLabel}</span>
                            </span>
                        </span>
                    </a>
                </div>

                {TRUSTBOX.businessUnitId && (
                    <div className={`mt-8 ${reveal(1).className}`} style={reveal(1).style}>
                        <TrustBox />
                    </div>
                )}
            </div>

            <div className={`relative mt-12 space-y-3 ${reveal(2).className}`} style={reveal(2).style}>
                <MarqueeRow items={rowA} duration={55} />
                <MarqueeRow items={rowB} reverse duration={65} />
            </div>
        </section>
    );
};

export default LpReviews;