import { useState, type CSSProperties, type MouseEvent } from 'react';
import { useSectionReveal } from '../usesectionreveal';

type Feature = {
    title: string;
    desc: string;
    image: string;
    wide?: boolean;
};

/* Edit titles, lines and images here. `wide` cards span 2 columns on desktop. */
const FEATURES: Feature[] = [
    {
        title: 'Products Hunting',
        desc: 'We research demand, competition and margins to find products that actually sell.',
        image: '/images/features/product-hunting.png',
        wide: true,
    },
    {
        title: 'Inventory Management',
        desc: 'Stock levels tracked and restocked on time, so you never miss a sale.',
        image: '/images/features/inventory.png',
    },
    {
        title: 'Customer Service',
        desc: 'Fast, friendly replies that protect your ratings and seller health.',
        image: '/images/features/customer-service.png',
    },
    {
        title: 'Monitoring, Tracking & Scaling',
        desc: 'Daily performance checks and data-led decisions to grow what works.',
        image: '/images/features/scaling.png',
    },
    {
        title: 'Order Management',
        desc: 'Every order processed, shipped and tracked from checkout to doorstep.',
        image: '/images/features/orders.png',
    },
    {
        title: 'Products Listing',
        desc: 'Keyword-rich titles, clean images and copy written to convert browsers into buyers.',
        image: '/images/features/listing.png',
        wide: true,
    },
];

/* Shows the first letter if the image is missing */
const FeatureImage = ({ src, title, wide }: { src: string; title: string; wide?: boolean }) => {
    const [failed, setFailed] = useState(false);
    const size = wide ? 'h-28 w-28 sm:h-36 sm:w-36' : 'h-24 w-24 sm:h-28 sm:w-28';

    if (failed) {
        return (
            <span className={`${size} flex items-center justify-center rounded-3xl bg-white/10 font-['Anybody',sans-serif] text-4xl font-bold text-[#8ac44b]`}>
                {title[0]}
            </span>
        );
    }
    return (
        <img
            src={src}
            alt=""
            loading="lazy"
            draggable={false}
            onError={() => setFailed(true)}
            className={`${size} object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-6 group-hover:scale-110`}
        />
    );
};

const LpFeatures = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.12 });

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.97]'
            }`,
        style: { transitionDelay: `${i * 110}ms` } as CSSProperties,
    });

    /* Spotlight follows the cursor */
    const trackMouse = (e: MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };

    return (
        <section
            ref={ref}
            id="features"
            className="relative overflow-hidden bg-[linear-gradient(180deg,#0e0531_0%,#1a1150_100%)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
        >
            {/* Background */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(75,58,160,0.55)_0%,transparent_70%)] blur-2xl" />
                <span className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(138,196,75,0.18)_0%,transparent_70%)] blur-2xl" />
                <span className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:22px_22px]" />
            </div>

            <div className="relative mx-auto w-full max-w-[1200px]">
                {/* ---------- Heading ---------- */}
                <header className={`mx-auto max-w-[720px] text-center ${reveal(0).className}`} style={reveal(0).style}>
                    <span className="inline-flex rounded-full bg-[#8ac44b] px-5 py-1.5 font-['Montserrat',sans-serif] text-xs font-bold text-[#0e0531]">
                        Everything Included
                    </span>
                    <h2 className="mt-4 font-['Anybody',sans-serif] text-[32px] font-bold leading-[1.1] text-white sm:text-[44px] lg:text-[52px]">
                        Extract the Best of E-Commerce
                    </h2>
                    <p className="mt-4 font-['Montserrat',sans-serif] text-base font-semibold text-[#8ac44b] sm:text-lg">
                        Ready to start your path toward e-commerce success?
                    </p>
                    <p className="mt-2 font-['Montserrat',sans-serif] text-sm leading-relaxed text-white/65 sm:text-[15px]">
                        You&rsquo;re in the right spot. We handle everything you need to enjoy the very best of e-commerce.
                    </p>
                </header>

                {/* ---------- Bento grid ---------- */}
                <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
                    {FEATURES.map((f, i) => {
                        const r = reveal(i + 1);
                        return (
                            <li
                                key={f.title}
                                className={`${f.wide ? 'lg:col-span-2' : ''} ${r.className}`}
                                style={r.style}
                            >
                                <article
                                    onMouseMove={trackMouse}
                                    className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[24px] isolate border border-white/10 bg-[#1a1250] p-6 transform-gpu transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-[#8ac44b]/50 hover:shadow-[0_28px_60px_rgba(0,0,0,0.4)] sm:p-7"
                                >
                                    {/* Cursor spotlight */}
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(360px_circle_at_var(--x,50%)_var(--y,50%),rgba(138,196,75,0.12),transparent_45%)]"
                                    />
                                    {/* Top shine line */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-x-8 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#8ac44b] to-transparent transition-transform duration-700 group-hover:scale-x-100"
                                    />

                                    <div
                                        className={`relative flex flex-1 flex-col ${f.wide ? 'lg:flex-row lg:items-end lg:justify-between lg:gap-8' : ''
                                            }`}
                                    >
                                        <div className={`mb-6 flex justify-end ${f.wide ? 'lg:order-last lg:mb-0 lg:self-center' : ''}`}>
                                            <FeatureImage src={f.image} title={f.title} wide={f.wide} />
                                        </div>

                                        <div className={`mt-auto ${f.wide ? 'lg:max-w-[55%]' : ''}`}>
                                            <span
                                                aria-hidden="true"
                                                className="mb-4 block h-1 w-8 rounded-full bg-[#8ac44b] transition-all duration-500 group-hover:w-16"
                                            />
                                            <h3 className="font-['Anybody',sans-serif] text-xl font-bold leading-tight text-white sm:text-2xl">
                                                {f.title}
                                            </h3>

                                            {/* Description: always shown on touch/tablet, expands on hover on desktop */}
                                            <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                                                <p className="overflow-hidden font-['Montserrat',sans-serif] text-sm leading-relaxed text-white/70">
                                                    <span className="block pt-3">{f.desc}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default LpFeatures;