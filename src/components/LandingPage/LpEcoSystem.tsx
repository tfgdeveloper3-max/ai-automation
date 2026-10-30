import { useEffect, useState, type CSSProperties } from 'react';
import { useSectionReveal } from '../usesectionreveal';

const SITE_LOGO = '/images/logo.png';

const STATS = [
    { value: 3, label: 'Years of Industry Leadership' },
    { value: 93, label: 'Valued Partners' },
    { value: 59, label: 'Dedicated E-Commerce Specialists' },
    { value: 107, label: 'Launched Campaigns' },
];

type Brand = { name: string; logo: string };

const SOURCES: Brand[] = [
    { name: "Sam's Club", logo: '/images/brands/sams-club.png' },
    { name: 'vidaXL', logo: '/images/brands/vidaxl.png' },
    { name: 'Alibaba', logo: '/images/brands/alibaba.png' },
    { name: 'MiniInTheBox', logo: '/images/brands/miniinthebox.png' },
    { name: 'Wish', logo: '/images/brands/wish.png' },
    { name: 'LightInTheBox', logo: '/images/brands/lightinthebox.png' },
    { name: 'Pure Formulas', logo: '/images/brands/pure-formulas.png' },
    { name: 'Kmart', logo: '/images/brands/kmart.png' },
    { name: 'Redbubble', logo: '/images/brands/redbubble.png' },
    { name: "Macy's", logo: '/images/brands/macys.png' },
    { name: 'DHgate', logo: '/images/brands/dhgate.png' },
    { name: 'SHEIN', logo: '/images/brands/shein.png' },
    { name: "Kohl's", logo: '/images/brands/kohls.png' },
    { name: 'Catch', logo: '/images/brands/catch.png' },
    { name: 'Cdiscount', logo: '/images/brands/cdiscount.png' },
];

const MARKETPLACES: Brand[] = [
    { name: 'eBay', logo: '/images/brands/ebay.png' },
    { name: 'WooCommerce', logo: '/images/brands/woo.png' },
    { name: 'Shopify', logo: '/images/brands/shopify.png' },
    { name: 'Etsy', logo: '/images/brands/etsy.png' },
    { name: 'Walmart', logo: '/images/brands/walmart.png' },
    { name: 'Amazon', logo: '/images/brands/amazon.png' },
    { name: 'Wix', logo: '/images/brands/wix.png' },
    { name: 'TikTok Shop', logo: '/images/brands/tiktok-shop.png' },
];

const T = {
    hub: 300,
    leftTiles: 600,
    leftTileStep: 70,
    leftLines: 1650,
    rightLines: 2550,
    lineStep: 120,
    lineDuration: 700,
    rightTiles: 3000,
    rightTileStep: 90,
};

const H = 440;
const LINK_W = 100;
const LEFT_ROWS = 5;
const RIGHT_ROWS = 4;
const rowCenters = (rows: number) => Array.from({ length: rows }, (_, i) => (H / rows) * (i + 0.5));

const useCountUp = (target: number, start: boolean, duration = 1600) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(target);
            return;
        }
        let raf = 0;
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, start, duration]);
    return value;
};

const StatItem = ({ value, label, start, delay }: { value: number; label: string; start: boolean; delay: number }) => {
    const [go, setGo] = useState(false);
    useEffect(() => {
        if (!start) return;
        const t = window.setTimeout(() => setGo(true), delay);
        return () => window.clearTimeout(t);
    }, [start, delay]);
    const n = useCountUp(value, go);

    return (
        <div
            style={{ transitionDelay: `${delay}ms` }}
            className={`text-center transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${start ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
        >
            <p className="font-['Anybody',sans-serif] text-[44px] font-bold leading-none text-[#8ac44b] sm:text-[60px]">
                {n}
                <span className="text-white">+</span>
            </p>
            <p className="mt-3 font-['Montserrat',sans-serif] text-xs font-semibold uppercase tracking-wide text-white/70 sm:text-sm">
                {label}
            </p>
        </div>
    );
};

const BrandLogo = ({ brand }: { brand: Brand }) => {
    const [failed, setFailed] = useState(false);
    if (failed) {
        return <span className="text-center font-['Anybody',sans-serif] text-sm font-bold text-[#0e0531]">{brand.name}</span>;
    }
    return (
        <img
            src={brand.logo}
            alt={brand.name}
            loading="lazy"
            draggable={false}
            onError={() => setFailed(true)}
            className="max-h-9 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-110"
        />
    );
};

const Tile = ({ brand, show, delay, from }: { brand: Brand; show: boolean; delay: number; from: string }) => (
    <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`h-full transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 ${show ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 scale-75 ${from}`
            }`}
    >
        <div className="group flex h-full min-h-[64px] items-center justify-center rounded-2xl bg-white p-3 shadow-[0_10px_25px_rgba(0,0,0,0.25)] ring-2 ring-transparent transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(0,0,0,0.35)] hover:ring-[#8ac44b]">
            <BrandLogo brand={brand} />
        </div>
    </div>
);

const Connectors = ({ side, show }: { side: 'left' | 'right'; show: boolean }) => {
    const ys = rowCenters(side === 'left' ? LEFT_ROWS : RIGHT_ROWS);
    const mid = H / 2;
    const start = side === 'left' ? T.leftLines : T.rightLines;
    const done = start + (ys.length - 1) * T.lineStep + T.lineDuration;

    const pathFor = (y: number) =>
        side === 'left'
            ? `M0 ${y} C${LINK_W * 0.6} ${y} ${LINK_W * 0.4} ${mid} ${LINK_W} ${mid}`
            : `M0 ${mid} C${LINK_W * 0.6} ${mid} ${LINK_W * 0.4} ${y} ${LINK_W - 2} ${y}`;

    const fade = (delay: number): CSSProperties => ({
        opacity: show ? 1 : 0,
        transition: 'opacity 400ms ease-out',
        transitionDelay: `${delay}ms`,
    });

    return (
        <svg width={LINK_W} height={H} viewBox={`0 0 ${LINK_W} ${H}`} className="shrink-0 overflow-visible" aria-hidden="true">
            {ys.map((y, i) => (
                <g key={y}>
                    <path d={pathFor(y)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                    <path
                        id={`lp-eco-${side}-${i}`}
                        d={pathFor(y)}
                        fill="none"
                        stroke="#8ac44b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        pathLength={1}
                        strokeDasharray="1"
                        style={{
                            strokeDashoffset: show ? 0 : 1,
                            transition: `stroke-dashoffset ${T.lineDuration}ms ease-out`,
                            transitionDelay: `${start + i * T.lineStep}ms`,
                        }}
                    />
                    {side === 'right' && (
                        <path
                            d={`M${LINK_W - 10} ${y - 6} L${LINK_W} ${y} L${LINK_W - 10} ${y + 6}`}
                            fill="none"
                            stroke="#8ac44b"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={fade(start + i * T.lineStep + T.lineDuration - 100)}
                        />
                    )}
                </g>
            ))}

            {side === 'left' && (
                <path
                    d={`M${LINK_W - 12} ${mid - 7} L${LINK_W} ${mid} L${LINK_W - 12} ${mid + 7}`}
                    fill="none"
                    stroke="#8ac44b"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={fade(done - 100)}
                />
            )}

            <g className="motion-reduce:hidden" style={fade(done)}>
                {ys.map((_, i) => (
                    <circle key={i} r="3.5" fill="#c3f07f">
                        <animateMotion dur={`${2.2 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}>
                            <mpath href={`#lp-eco-${side}-${i}`} />
                        </animateMotion>
                    </circle>
                ))}
            </g>
        </svg>
    );
};

const Hub = ({ show, size = 'h-52 w-52' }: { show: boolean; size?: string }) => (
    <div
        style={{ transitionDelay: `${T.hub}ms` }}
        className={`relative shrink-0 ${size} transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
    >
        <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#8ac44b]/15 [animation-duration:2.6s] motion-reduce:hidden" />
        <span
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#8ac44b,#2f2169,#4b3aa0,#8ac44b)] animate-[spin_6s_linear_infinite] motion-reduce:animate-none"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white shadow-[0_0_60px_rgba(138,196,75,0.35)]">
            <div className="flex h-[78%] w-[78%] items-center justify-center rounded-full bg-[linear-gradient(160deg,#2f2169_0%,#0e0531_100%)] p-5">
                <img src={SITE_LOGO} alt="AMZ Automation Solutions" draggable={false} className="max-h-full max-w-full object-contain" />
            </div>
        </div>
    </div>
);

const SideLabel = ({ children, show, delay }: { children: string; show: boolean; delay: number }) => (
    <p
        style={{ transitionDelay: `${delay}ms` }}
        className={`mb-4 font-['Montserrat',sans-serif] text-xs font-semibold uppercase tracking-wider text-[#8ac44b] transition-opacity duration-500 motion-reduce:transition-none motion-reduce:opacity-100 ${show ? 'opacity-100' : 'opacity-0'
            }`}
    >
        {children}
    </p>
);

const LpEcosystem = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.2 });

    return (
        <section
            ref={ref}
            id="ecosystem"
            className="relative overflow-hidden bg-[linear-gradient(180deg,#0e0531_0%,#1b1252_100%)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 [background-image:repeating-radial-gradient(circle_at_50%_68%,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_56px)]"
            />
            <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[68%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(138,196,75,0.14)_0%,transparent_65%)]" />

            <div className="relative mx-auto w-full max-w-[1200px]">
                <h2
                    className={`mx-auto max-w-[900px] text-center font-['Anybody',sans-serif] text-[30px] font-bold leading-[1.12] text-white transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 sm:text-[42px] lg:text-[52px] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}
                >
                    Engineering Tomorrow's Digital Retail, Today.
                </h2>

                <div className="mt-12 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
                    {STATS.map((s, i) => (
                        <StatItem key={s.label} {...s} start={inView} delay={i * 120} />
                    ))}
                </div>

                <div className="mt-20 hidden items-center justify-center xl:flex">
                    <div>
                        <SideLabel show={inView} delay={T.leftTiles}>We source from</SideLabel>
                        <div className="grid w-[400px] grid-cols-3 gap-3" style={{ height: H, gridTemplateRows: `repeat(${LEFT_ROWS}, 1fr)` }}>
                            {SOURCES.map((b, i) => (
                                <Tile key={b.name} brand={b} show={inView} delay={T.leftTiles + i * T.leftTileStep} from="-translate-x-16" />
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <Connectors side="left" show={inView} />
                    </div>
                    <div className="mt-8">
                        <Hub show={inView} />
                    </div>
                    <div className="mt-8">
                        <Connectors side="right" show={inView} />
                    </div>

                    <div>
                        <SideLabel show={inView} delay={T.rightTiles}>We sell on</SideLabel>
                        <div className="grid w-[340px] grid-cols-2 gap-3" style={{ height: H, gridTemplateRows: `repeat(${RIGHT_ROWS}, 1fr)` }}>
                            {MARKETPLACES.map((b, i) => (
                                <Tile key={b.name} brand={b} show={inView} delay={T.rightTiles + i * T.rightTileStep} from="translate-x-16" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center xl:hidden">
                    <div className="w-full">
                        <SideLabel show={inView} delay={T.leftTiles}>We source from</SideLabel>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                            {SOURCES.map((b, i) => (
                                <Tile key={b.name} brand={b} show={inView} delay={T.leftTiles + i * 50} from="translate-y-8" />
                            ))}
                        </div>
                    </div>

                    <FlowArrow show={inView} delay={1500} />
                    <Hub show={inView} size="h-40 w-40" />
                    <FlowArrow show={inView} delay={1900} />

                    <div className="w-full">
                        <SideLabel show={inView} delay={2100}>We sell on</SideLabel>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {MARKETPLACES.map((b, i) => (
                                <Tile key={b.name} brand={b} show={inView} delay={2100 + i * 70} from="translate-y-8" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FlowArrow = ({ show, delay }: { show: boolean; delay: number }) => (
    <svg width="24" height="64" viewBox="0 0 24 64" className="my-4" aria-hidden="true">
        <path d="M12 0 V58" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <path
            d="M12 0 V58"
            stroke="#8ac44b"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            style={{ strokeDashoffset: show ? 0 : 1, transition: 'stroke-dashoffset 600ms ease-out', transitionDelay: `${delay}ms` }}
        />
        <path
            d="M5 52 L12 60 L19 52"
            fill="none"
            stroke="#8ac44b"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: show ? 1 : 0, transition: 'opacity 300ms', transitionDelay: `${delay + 500}ms` }}
        />
    </svg>
);

export default LpEcosystem;