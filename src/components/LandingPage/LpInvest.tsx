import { useRef, type CSSProperties, type MouseEvent } from 'react';
import { useSectionReveal } from '../usesectionreveal';

const POINTS = [
    { title: 'Minimal Initial Capital', desc: 'Launch your venture with a fraction of the budget traditional brick-and-mortar businesses require.' },
    { title: 'Truly Hands-Off Operations', desc: 'Our dedicated team and advanced systems manage your store\u2019s daily tasks from start to finish.' },
    { title: 'Omnichannel Reach', desc: 'Expand seamlessly across Shopify, TikTok Shop, Walmart, eBay, Etsy, and more.' },
];

type Layer = {
    src: string;
    alt: string;
    box: CSSProperties;
    from: string;
    delay: number;
    depth: number;
    z: string;
};

const LAYERS: Layer[] = [
    {
        src: '/images/invest/Marketplace-dashboard.png',
        alt: 'Illustrative commerce dashboard showing sales, orders and active products',
        box: { left: '8%', top: '12%', width: '83%' },
        from: 'translate-y-16 -rotate-6 scale-95',
        delay: 300,
        depth: 6,
        z: 'z-10',
    },
    {
        src: '/images/invest/Floating-analytics.png',
        alt: '',
        box: { left: '61%', top: '5%', width: '31%' },
        from: '-translate-y-12 translate-x-10 rotate-6',
        delay: 900,
        depth: 18,
        z: 'z-20',
    },
    {
        src: '/images/invest/Product-card.png',
        alt: '',
        box: { left: '4%', top: '67%', width: '34%' },
        from: '-translate-x-16',
        delay: 1300,
        depth: 14,
        z: 'z-20',
    },
    {
        src: '/images/invest/Order-notification.png',
        alt: '',
        box: { left: '43%', top: '80%', width: '33%' },
        from: 'translate-y-12',
        delay: 1650,
        depth: 22,
        z: 'z-30',
    },
];

const Check = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LpInvest = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.2 });
    const visualRef = useRef<HTMLDivElement>(null);

    const reveal = (i: number, from = 'translate-y-8') => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${from}`
            }`,
        style: { transitionDelay: `${i * 120}ms` } as CSSProperties,
    });

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const el = visualRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    };
    const onLeave = () => {
        visualRef.current?.style.setProperty('--px', '0');
        visualRef.current?.style.setProperty('--py', '0');
    };

    return (
        <section ref={ref} id="invest" className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="absolute inset-0 opacity-[0.5] [background-image:repeating-linear-gradient(135deg,rgba(47,33,105,0.04)_0px,rgba(47,33,105,0.04)_1px,transparent_1px,transparent_28px)]" />
                <span className="absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(138,196,75,0.20)_0%,transparent_65%)]" />
            </div>

            <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
                <div>
                    <div className={reveal(0, '-translate-x-8').className} style={reveal(0).style}>
                        <span className="inline-flex rounded-full bg-[#8ac44b] px-5 py-1.5 font-['Montserrat',sans-serif] text-xs font-bold text-[#0e0531]">
                            Why E-Commerce
                        </span>
                        <h2 className="mt-4 font-['Anybody',sans-serif] text-[34px] font-bold leading-[1.1] text-[#0e0531] sm:text-[46px] lg:text-[54px]">
                            A Smarter Way To Grow Your Capital
                        </h2>
                        <p className="mt-5 max-w-[520px] font-['Montserrat',sans-serif] text-[17px] leading-[1.8] text-[#4a4a5a] sm:text-[17px]">
                            Instead of passive stock tracking, own an active digital storefront driven
                            by real consumer demand. AMZ Automation helps you turn leading online
                            marketplaces into engines for predictable revenue and expansion through
                            expert solutions that streamline selling and optimize your catalog strategy.
                        </p>
                    </div>

                    <ul className="mt-8 space-y-4">
                        {POINTS.map((p, i) => {
                            const r = reveal(i + 1, '-translate-x-8');
                            return (
                                <li key={p.title} className={`flex gap-4 ${r.className}`} style={r.style}>
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2f2169] text-[#8ac44b]">
                                        <Check />
                                    </span>
                                    <span>
                                        <span className="block font-['Anybody',sans-serif] text-lg font-bold text-[#0e0531]">{p.title}</span>
                                        <span className="block font-['Montserrat',sans-serif] text-sm text-[#6b6b7a]">{p.desc}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    <div className={reveal(4, '-translate-x-8').className} style={reveal(4).style}>
                        <a
                            href="#home"
                            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#0e0531] py-1.5 pl-7 pr-1.5 font-['Montserrat',sans-serif] text-sm font-semibold text-white transition hover:bg-[#2f2169] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ac44b]"
                        >
                            Get started
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8ac44b] text-[#0e0531]">
                                <ChevronsRight className="h-4 w-4" />
                            </span>
                        </a>
                    </div>
                </div>

                <div>
                    <div
                        ref={visualRef}
                        onMouseMove={onMove}
                        onMouseLeave={onLeave}
                        className="relative mx-auto aspect-[740/640] w-full max-w-[640px]"
                    >
                        <span
                            aria-hidden="true"
                            className={`absolute left-[6%] top-[1%] aspect-square w-[88%] rounded-full border border-[#2f2169]/10 bg-[radial-gradient(circle_at_50%_40%,#f1effa_0%,#f7f7fb_60%,transparent_100%)] transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                                }`}
                        />

                        {LAYERS.map((l) => (
                            <div
                                key={l.src}
                                style={{ ...l.box, transitionDelay: `${l.delay}ms` }}
                                className={`absolute ${l.z} transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:rotate-0 motion-reduce:scale-100 ${inView ? 'opacity-100 translate-x-0 translate-y-0 rotate-0 scale-100' : `opacity-0 ${l.from}`
                                    }`}
                            >
                                <img
                                    src={l.src}
                                    alt={l.alt}
                                    draggable={false}
                                    loading="lazy"
                                    className="block h-auto w-full select-none transition-transform duration-300 ease-out motion-reduce:[transform:none!important]"
                                    style={{
                                        transform: `translate3d(calc(var(--px, 0) * ${l.depth}px), calc(var(--py, 0) * ${l.depth}px), 0)`,
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <p
                        style={{ transitionDelay: '2000ms' }}
                        className={`mt-2 text-center font-['Montserrat',sans-serif] text-xs text-[#9a9aa8] transition-opacity duration-700 motion-reduce:transition-none motion-reduce:opacity-100 ${inView ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LpInvest;