import type { CSSProperties } from 'react';
import { useSectionReveal } from './usesectionreveal';

const BRANDS = ['Culture Amp', 'Contentful', 'Dropbox', 'Airtable'];

const STATS = [
    { value: '65%', label: ['Paid Serach', 'Marketing'] },
    { value: '65%', label: ['Paid Serach', 'Marketing'] },
];

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SkillsSection = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });

    const reveal = (i: number, from = 'translate-y-8') => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${from}`
            }`,
        style: { transitionDelay: `${i * 120}ms` } as CSSProperties,
    });

    return (
        <section ref={ref}>
            {/* ---------- "1k+ Brands Trust Us" white strip ---------- */}
            <div className="bg-white px-5 py-3 text-center sm:py-4">
                <h2 className="font-['DM_Sans',sans-serif] text-xl font-normal text-[#111111] sm:text-2xl lg:text-[28px]">
                    1k+ <span className="font-semibold">Brands</span> Trust Us
                </h2>
                {/* Logos are part of the background image, so list them for screen readers */}
                <ul className="sr-only">
                    {BRANDS.map((b) => (
                        <li key={b}>{b}</li>
                    ))}
                </ul>
            </div>

            {/* ---------- Dark area with Skill-bg.png ---------- */}
            <div
                className="bg-[#120c2a] bg-[url('/images/Skill-bg.png')] bg-[length:150vw_auto] bg-top bg-no-repeat md:bg-[length:120vw_auto] lg:min-h-[51.4vw] lg:bg-[length:100%_auto]"
            >
                <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-5 pb-20 pt-[calc(10.9vw+40px)] sm:px-8 md:pt-[calc(8.7vw+56px)] lg:grid-cols-2 lg:gap-12 lg:px-10 lg:pb-24 lg:pt-[calc(7.24vw+56px)] xl:pr-24">
                    {/* Illustration */}
                    <div
                        className={reveal(0, 'translate-x-0 translate-y-8 lg:translate-x-[-2rem] lg:translate-y-0').className}
                        style={reveal(0).style}
                    >
                        <img
                            src="/images/Skill.png"
                            alt="Automation flow: Alex abandons a cart, gets an email reminder, buys the product, leading to 239% sales growth"
                            className="mx-auto block h-auto w-full max-w-[480px] select-none lg:max-w-[560px]"
                            draggable={false}
                        />
                    </div>

                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <div className={reveal(1).className} style={reveal(1).style}>
                            <span className="inline-flex rounded-full bg-[#8ac44b] px-8 py-1.5 font-['Montserrat',sans-serif] text-xs font-medium text-white sm:text-[13px]">
                                About Company
                            </span>

                            <h2 className="mt-4 font-['DM_Sans',sans-serif] text-[32px] font-light leading-[1.15] text-white sm:text-[40px] lg:text-[44px] xl:text-[48px]">
                                Skills To <span className="font-semibold">Improve</span>
                                <br />
                                Your <span className="font-semibold">Company</span> Brand
                            </h2>

                            <p className="mx-auto mt-4 max-w-[540px] font-['Montserrat',sans-serif] text-sm leading-[1.7] text-white/80 lg:mx-0">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                been the industry&rsquo;s standard dummy text ever since 1966, when designers at Letraset and
                                James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero
                                translation and scrambled it to make dummy text for Letraset&rsquo;s Body Type sheets. It has
                                survived not only many decades, but also the leap into electronic typesetting, remaining
                                essentially unchanged.
                            </p>
                        </div>

                        <div
                            className={`mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 lg:justify-start ${reveal(2).className}`}
                            style={reveal(2).style}
                        >
                            {STATS.map((s, i) => (
                                <div key={i} className="flex items-center gap-4 text-left">
                                    <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 font-['DM_Sans',sans-serif] text-xl font-medium italic text-white lg:h-20 lg:w-20 lg:text-[22px]">
                                        {s.value}
                                    </span>
                                    <span className="font-['Anybody',sans-serif] text-base font-light leading-tight text-white/85 lg:text-lg">
                                        {s.label[0]}
                                        <br />
                                        {s.label[1]}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div
                            className={`mt-10 flex items-center justify-center gap-2 lg:justify-start ${reveal(3).className}`}
                            style={reveal(3).style}
                        >
                            <a
                                href="#"
                                className="inline-flex h-11 items-center rounded-full bg-[#8ac44b] px-8 font-['Montserrat',sans-serif] text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Explore More
                            </a>
                            <a
                                href="#"
                                aria-label="Explore more"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#8ac44b] text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                <ChevronsRight className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;