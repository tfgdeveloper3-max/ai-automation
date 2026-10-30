import { type CSSProperties } from 'react';
import { useSectionReveal } from '../usesectionreveal';

type Service = {
    title: string;
    desc: string;
    iconLetter: string;
    href: string;
};

/* Edit titles, lines and links here */
const SERVICES: Service[] = [
    {
        title: 'Shopify Automation',
        desc: 'Custom-branded storefront creation and hands-free fulfillment managed entirely by AMZ Automation experts.',
        iconLetter: 'S',
        href: '/service/shopify-automation',
    },
    {
        title: 'TikTok Shop Automation',
        desc: 'Capitalize on live-stream shopping and viral trends with our comprehensive social commerce management.',
        iconLetter: 'T',
        href: '/service/tiktok-shop-automation',
    },
    {
        title: 'Walmart Automation',
        desc: 'Secure marketplace approval and scale your sales catalog across Walmart effortlessly.',
        iconLetter: 'W',
        href: '/service/walmart-automation',
    },
    {
        title: 'ebay Automation',
        desc: 'High-performing product curation and automated inventory control tailored for the eBay platform.',
        iconLetter: 'e',
        href: '/service/ebay-automation',
    },
    {
        title: 'Etsy Automation',
        desc: 'Optimize niche, creative, or vintage product listings with professional SEO and hands-off store upkeep.',
        iconLetter: 'E',
        href: '/service/etsy-automation',
    },
];

const ArrowRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* Shows the letter icon for each service */
const ServiceIcon = ({ letter }: { letter: string }) => {
    return (
        <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f1eefc] ring-1 ring-[#2f2169]/10 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-white group-hover:ring-[#8ac44b] sm:h-[72px] sm:w-[72px]">
            <span className="font-['Anybody',sans-serif] text-2xl font-bold text-[#2f2169] sm:text-3xl">
                {letter}
            </span>
        </span>
    );
};

const LpEcomServices = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.1 });

    const reveal = (i: number, from = 'translate-y-8') => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${from}`
            }`,
        style: { transitionDelay: `${i * 90}ms` } as CSSProperties,
    });

    return (
        <section ref={ref} id="ecom-services" className="bg-[#f7f7fb] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
                {/* ---------- Left: sticky intro panel ---------- */}
                <div className={reveal(0, '-translate-x-8').className} style={reveal(0).style}>
                    <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#2f2169_0%,#0e0531_100%)] px-7 py-10 text-white shadow-[0_30px_60px_rgba(14,5,49,0.25)] sm:px-10 sm:py-12 lg:sticky lg:top-28">
                        <span
                            aria-hidden="true"
                            className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(138,196,75,0.35)_0%,transparent_70%)]"
                        />
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:20px_20px]"
                        />

                        <div className="relative">
                            <span className="inline-flex rounded-full bg-[#8ac44b] px-5 py-1.5 font-['Montserrat',sans-serif] text-xs font-bold text-[#0e0531]">
                                What We Do
                            </span>
                            <h2 className="mt-5 font-['Anybody',sans-serif] text-[34px] font-bold leading-[1.1] sm:text-[44px]">
                                Digital Storefront Solutions
                            </h2>
                            <p className="mt-5 font-['Montserrat',sans-serif] text-[17px] leading-[1.8] text-white/75 sm:text-[17px]">
                                Generating reliable online revenue is entirely effortless with our fully
                                managed e-commerce model. We utilize frameworks perfected over years of
                                industry experience to build customized roadmaps tailored specifically
                                for AMZ Automation partners.
                            </p>
                            <p className="mt-4 font-['Montserrat',sans-serif] text-[17px] leading-[1.8] text-white/75 sm:text-[17px]">
                                Our dedicated professionals collaborate closely with you to design a
                                tailored blueprint aligned with your digital aspirations and financial
                                growth targets.
                            </p>

                            <div className="mt-8 flex items-center gap-6 border-t border-white/10 pt-7">
                                <div>
                                    <p className="font-['Anybody',sans-serif] text-3xl font-bold text-[#8ac44b]">{SERVICES.length}</p>
                                    <p className="font-['Montserrat',sans-serif] text-xs text-white/60">Services</p>
                                </div>
                                <div>
                                    <p className="font-['Anybody',sans-serif] text-3xl font-bold text-[#8ac44b]">3+ Years</p>
                                    <p className="font-['Montserrat',sans-serif] text-xs text-white/60">Refining</p>
                                </div>
                            </div>

                            <a
                                href="#home"
                                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#8ac44b] py-1.5 pl-6 pr-1.5 font-['Montserrat',sans-serif] text-sm font-semibold text-[#0e0531] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Get a free consultation
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0e0531] text-[#8ac44b]">
                                    <ChevronsRight className="h-4 w-4" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ---------- Right: service rows ---------- */}
                <ul className="flex flex-col gap-3">
                    {SERVICES.map((s, i) => {
                        const r = reveal(i + 1, 'translate-x-8');
                        return (
                            <li key={s.title} className={r.className} style={r.style}>
                                <a
                                    href={s.href}
                                    className="group relative flex items-center gap-4 overflow-hidden rounded-[20px] border border-[#2f2169]/10 bg-white p-3 pr-4 shadow-[0_6px_20px_rgba(15,5,49,0.05)] transition-[box-shadow,border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_20px_45px_rgba(24,12,74,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b] sm:gap-5 sm:p-4 sm:pr-5"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(110deg,#0e0531_0%,#2f2169_100%)] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                                    />
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-[#8ac44b] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />

                                    <span className="relative">
                                        <ServiceIcon letter={s.iconLetter} />
                                    </span>

                                    <span className="relative min-w-0 flex-1">
                                        <span className="block font-['Anybody',sans-serif] text-lg font-bold text-[#0e0531] transition-colors duration-500 group-hover:text-white sm:text-xl">
                                            {s.title}
                                        </span>
                                        <span className="mt-1 block font-['Montserrat',sans-serif] text-[15px] leading-snug text-[#6b6b7a] transition-colors duration-500 group-hover:text-white/70">
                                            {s.desc}
                                        </span>
                                    </span>

                                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2f2169]/15 text-[#2f2169] transition-all duration-500 group-hover:border-[#8ac44b] group-hover:bg-[#8ac44b] group-hover:text-[#0e0531]">
                                        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-rotate-45" />
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default LpEcomServices;