import { type CSSProperties } from 'react';
import { useSectionReveal } from '../usesectionreveal';

const STATS = [
    { value: '65%', label: ['Paid Serach', 'Marketing'] },
    { value: '65%', label: ['Paid Serach', 'Marketing'] },
];


const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const AboutSkills = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });

    const reveal = (i: number, from = 'translate-y-8') => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${from}`
            }`,
        style: { transitionDelay: `${i * 120}ms` } as CSSProperties,
    });

    return (
        <section ref={ref} className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="mx-auto w-full max-w-[1200px]">

                <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-12">
                    <div
                        className={reveal(1, 'translate-x-0 translate-y-8 lg:translate-x-[-2rem] lg:translate-y-0').className}
                        style={reveal(1).style}
                    >
                        <img
                            src="/images/Skill.png"
                            alt="Automation flow: Alex abandons a cart, gets an email reminder, buys the product, leading to 239% sales growth"
                            className="mx-auto block h-auto w-full max-w-[480px] select-none lg:max-w-[560px]"
                            draggable={false}
                        />
                    </div>

                    {/* Text */}
                    <div className="text-center lg:text-left">
                        <div className={reveal(2).className} style={reveal(2).style}>
                            <span className="inline-flex rounded-full bg-[#8ac44b] px-8 py-1.5 font-['Montserrat',sans-serif] text-xs font-medium text-white sm:text-[13px]">
                                About Company
                            </span>

                            <h2 className="mt-4 font-['DM_Sans',sans-serif] text-[32px] font-light leading-[1.15] text-[#111111] sm:text-[40px] lg:text-[44px] xl:text-[48px]">
                                Skills To <span className="font-semibold">Improve</span>
                                <br />
                                Your <span className="font-semibold">Company</span> Brand
                            </h2>

                            <p className="mx-auto mt-4 max-w-[540px] font-['Montserrat',sans-serif] text-sm leading-[1.7] text-[#6b6b7a] lg:mx-0">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                been the industry&rsquo;s standard dummy text ever since 1966, when designers at Letraset and
                                James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero
                                translation and scrambled it to make dummy text for Letraset&rsquo;s Body Type sheets. It has
                                survived not only many decades, but also the leap into electronic typesetting, remaining
                                essentially unchanged.
                            </p>
                        </div>

                        <div
                            className={`mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 lg:justify-start ${reveal(3).className}`}
                            style={reveal(3).style}
                        >
                            {STATS.map((s, i) => (
                                <div key={i} className="flex items-center gap-4 text-left">
                                    <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border border-[#1d1650]/10 bg-[#f3f1fb] font-['DM_Sans',sans-serif] text-xl font-medium italic text-[#1d1650] lg:h-20 lg:w-20 lg:text-[22px]">
                                        {s.value}
                                    </span>
                                    <span className="font-['Anybody',sans-serif] text-base font-light leading-tight text-[#2b2b3a] lg:text-lg">
                                        {s.label[0]}
                                        <br />
                                        {s.label[1]}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div
                            className={`mt-10 flex items-center justify-center gap-2 lg:justify-start ${reveal(4).className}`}
                            style={reveal(4).style}
                        >
                            <a
                                href="#"
                                className="inline-flex h-11 items-center rounded-full bg-[#8ac44b] px-8 font-['Montserrat',sans-serif] text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1650]"
                            >
                                Explore More
                            </a>
                            <a
                                href="#"
                                aria-label="Explore more"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#8ac44b] text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1650]"
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

export default AboutSkills;