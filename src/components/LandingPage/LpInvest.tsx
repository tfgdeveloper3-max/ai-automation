import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { useSectionReveal } from '../usesectionreveal';

const POINTS = [
    { title: 'Low startup cost', desc: 'Start with a fraction of what a traditional business needs.' },
    { title: 'Hands-off for you', desc: 'Our team and AI tools run the store day to day.' },
    { title: 'Multiple marketplaces', desc: 'Amazon, Walmart, Shopify, TikTok Shop and more.' },
];

const BARS = [32, 41, 36, 48, 44, 52, 47, 58, 55, 63, 60, 72, 69, 84];

const STATS = [
    { label: 'Sales today', value: 4496, prefix: '$' },
    { label: 'Units sold', value: 139 },
    { label: 'Orders', value: 61 },
];

const useCountUp = (target: number, start: boolean, duration = 1400) => {
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

const Stat = ({ label, value, prefix = '', start }: { label: string; value: number; prefix?: string; start: boolean }) => {
    const n = useCountUp(value, start);
    return (
        <div className="rounded-xl bg-[#f4f2fb] px-2 py-2 text-center">
            <p className="font-['Anybody',sans-serif] text-[15px] font-bold text-[#0e0531]">
                {prefix}
                {n.toLocaleString()}
            </p>
            <p className="font-['Montserrat',sans-serif] text-[9px] text-[#6b6b7a]">{label}</p>
        </div>
    );
};

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

/* Floating notification card around the phone */
const FloatCard = ({
    icon,
    title,
    value,
    className,
    show,
    delay,
}: {
    icon: ReactNode;
    title: string;
    value: string;
    className: string;
    show: boolean;
    delay: number;
}) => (
    <div
        aria-hidden="true"
        style={{ transitionDelay: `${delay}ms` }}
        className={`absolute z-20 hidden items-center gap-3 rounded-2xl border border-[#2f2169]/10 bg-white px-4 py-3 shadow-[0_18px_40px_rgba(14,5,49,0.16)] transition-[opacity,transform] duration-700 ease-out hover:-translate-y-1 sm:flex motion-reduce:transition-none ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } ${className}`}
    >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#8ac44b] text-[#0e0531]">{icon}</span>
        <span>
            <span className="block font-['Montserrat',sans-serif] text-[11px] text-[#6b6b7a]">{title}</span>
            <span className="block font-['Anybody',sans-serif] text-sm font-bold text-[#0e0531]">{value}</span>
        </span>
    </div>
);

const LpInvest = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.2 });

    const reveal = (i: number, from = 'translate-y-8') => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${from}`
            }`,
        style: { transitionDelay: `${i * 120}ms` } as CSSProperties,
    });

    const max = Math.max(...BARS);

    return (
        <section ref={ref} id="invest" className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            {/* Background: soft diagonal lines + glow */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="absolute inset-0 opacity-[0.5] [background-image:repeating-linear-gradient(135deg,rgba(47,33,105,0.04)_0px,rgba(47,33,105,0.04)_1px,transparent_1px,transparent_28px)]" />
                <span className="absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(138,196,75,0.20)_0%,transparent_65%)]" />
            </div>

            <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
                {/* ---------- Left: copy ---------- */}
                <div>
                    <div className={reveal(0, '-translate-x-8').className} style={reveal(0).style}>
                        <span className="inline-flex rounded-full bg-[#8ac44b] px-5 py-1.5 font-['Montserrat',sans-serif] text-xs font-bold text-[#0e0531]">
                            Why E-Commerce
                        </span>
                        <h2 className="mt-4 font-['Anybody',sans-serif] text-[34px] font-bold leading-[1.1] text-[#0e0531] sm:text-[46px] lg:text-[54px]">
                            A Different Way To Invest
                        </h2>
                        <p className="mt-5 max-w-[520px] font-['Montserrat',sans-serif] text-sm leading-[1.8] text-[#4a4a5a] sm:text-[15px]">
                            Instead of watching numbers on a stock chart, own a store that earns from real
                            customers. We help you turn digital marketplaces into engines for growth and profit,
                            with tailored services that simplify selling and sharpen your product strategy.
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

                {/* ---------- Right: phone dashboard ---------- */}
                <div className={`relative mx-auto w-full max-w-[520px] ${reveal(1, 'translate-y-12').className}`} style={reveal(1).style}>
                    {/* Rings behind the phone */}
                    <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#2f2169]/15" />
                    <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f2169]/[0.04]" />

                    {/* Phone */}
                    <div className="relative z-10 mx-auto w-[280px] rounded-[44px] border-[10px] border-[#14102e] bg-white shadow-[0_40px_80px_rgba(14,5,49,0.30)] sm:w-[300px]">
                        <span aria-hidden="true" className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-[#14102e]" />

                        <div className="px-4 pb-5 pt-10" role="img" aria-label="Example store dashboard showing daily sales growing over two weeks">
                            {/* App header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-['Montserrat',sans-serif] text-[10px] text-[#6b6b7a]">Good morning</p>
                                    <p className="font-['Anybody',sans-serif] text-base font-bold text-[#0e0531]">Your Store</p>
                                </div>
                                <span className="flex items-center gap-1.5 rounded-full bg-[#8ac44b]/15 px-2.5 py-1 font-['Montserrat',sans-serif] text-[9px] font-semibold text-[#4f7a20]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#8ac44b]" /> AI autopilot on
                                </span>
                            </div>

                            {/* Stats */}
                            <div className="mt-4 grid grid-cols-3 gap-2">
                                {STATS.map((s) => (
                                    <Stat key={s.label} {...s} start={inView} />
                                ))}
                            </div>

                            {/* Chart */}
                            <div className="mt-4 rounded-2xl bg-[linear-gradient(160deg,#2f2169_0%,#0e0531_100%)] p-3.5">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="font-['Montserrat',sans-serif] text-[9px] text-white/60">Last 14 days</p>
                                        <p className="font-['Anybody',sans-serif] text-lg font-bold text-white">$69.3k</p>
                                    </div>
                                    <span className="rounded-full bg-[#8ac44b] px-2 py-0.5 font-['Montserrat',sans-serif] text-[10px] font-bold text-[#0e0531]">
                                        ↑ 28%
                                    </span>
                                </div>
                                <div className="mt-3 flex h-24 items-end gap-[3px]">
                                    {BARS.map((b, i) => (
                                        <span
                                            key={i}
                                            className={`flex-1 rounded-t-[3px] transition-[height] duration-700 ease-out motion-reduce:transition-none ${i === BARS.length - 1 ? 'bg-[#8ac44b]' : 'bg-white/30'
                                                }`}
                                            style={{
                                                height: inView ? `${(b / max) * 100}%` : '6%',
                                                transitionDelay: `${300 + i * 50}ms`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Activity list */}
                            <ul className="mt-4 divide-y divide-[#2f2169]/10 font-['Montserrat',sans-serif] text-[11px] text-[#0e0531]">
                                {[
                                    ['Manage orders', '41'],
                                    ['Inventory alerts', '3'],
                                    ['Customer messages', '6'],
                                ].map(([label, count]) => (
                                    <li key={label} className="flex items-center justify-between py-2.5">
                                        {label}
                                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2f2169] px-1.5 text-[10px] font-semibold text-white">
                                            {count}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Floating cards */}
                    <FloatCard
                        show={inView}
                        delay={700}
                        className="left-0 top-10 lg:-left-6"
                        title="New order"
                        value="+$48.90"
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                                <path d="M5 7h14l-1.5 9h-11L5 7Zm3 0a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                            </svg>
                        }
                    />
                    <FloatCard
                        show={inView}
                        delay={950}
                        className="right-0 top-[44%] lg:-right-4"
                        title="AI restocked"
                        value="120 units"
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        }
                    />
                    <FloatCard
                        show={inView}
                        delay={1200}
                        className="bottom-12 left-2 lg:-left-2"
                        title="Profit this month"
                        value="+28%"
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                                <path d="M4 17l6-6 4 4 6-7M15 8h5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default LpInvest;