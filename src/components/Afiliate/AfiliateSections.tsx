import type { CSSProperties, ReactNode } from 'react';
import { useSectionReveal } from '../usesectionreveal';

const P_LONG =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset\u2019s Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged.';

const P_SHORT =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation.';

const ChevronsRight = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 7l5 5-5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

interface SplitProps {
    id?: string;
    heading: ReactNode;
    paragraphs: string[];
    image: string;
    imageAlt: string;
    imageSide: 'left' | 'right';
    imageMaxW?: string; 
    bg?: string; 
    cta?: { label: string; href: string };
}

const AffiliateSplit = ({
    id,
    heading,
    paragraphs,
    image,
    imageAlt,
    imageSide,
    imageMaxW = 'max-w-[520px]',
    bg = 'bg-white',
    cta,
}: SplitProps) => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.15 });
    const imageRight = imageSide === 'right';

    const reveal = (i: number, from: string) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${from}`
            }`,
        style: { transitionDelay: `${i * 150}ms` } as CSSProperties,
    });

    const img = reveal(0, `translate-y-8 lg:translate-y-0 ${imageRight ? 'lg:translate-x-8' : 'lg:translate-x-[-2rem]'}`);
    const txt = reveal(1, 'translate-y-8');

    return (
        <section id={id} ref={ref} className={`${bg} px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24`}>
            <div
                className={`mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 lg:gap-14 xl:gap-20 ${imageRight ? 'lg:grid-cols-[1.1fr_1fr]' : 'lg:grid-cols-[1fr_1.1fr]'
                    }`}
            >
                <div className={`${imageRight ? 'lg:order-2' : ''} ${img.className}`} style={img.style}>
                    <img
                        src={image}
                        alt={imageAlt}
                        loading="lazy"
                        draggable={false}
                        className={`mx-auto block h-auto w-full select-none ${imageMaxW}`}
                    />
                </div>

                {/* Text */}
                <div className={`${imageRight ? 'lg:order-1' : ''} ${txt.className}`} style={txt.style}>
                    <h2 className="font-['Anybody',sans-serif] text-[30px] font-light leading-[1.15] text-[#111111] sm:text-[40px] lg:text-[46px] xl:text-[52px]">
                        {heading}
                    </h2>

                    {paragraphs.map((p, i) => (
                        <p
                            key={i}
                            className="mt-4 max-w-[600px] font-['Montserrat',sans-serif] text-sm leading-[1.7] text-[#3a3a48] lg:text-[15px]"
                        >
                            {p}
                        </p>
                    ))}

                    {cta && (
                        <div className="mt-7 flex items-center gap-2">
                            <a
                                href={cta.href}
                                className="inline-flex h-11 items-center rounded-full bg-[#8ac44b] px-6 font-['Montserrat',sans-serif] text-[13px] font-medium text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1650] sm:px-8 sm:text-sm"
                            >
                                {cta.label}
                            </a>
                            <a
                                href={cta.href}
                                aria-label={cta.label}
                                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8ac44b] text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1650]"
                            >
                                <ChevronsRight className="h-5 w-5" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const AffiliateSections = () => (
    <>
        <AffiliateSplit
            heading={
                <>
                    Referral <span className="font-bold">Partnership</span>
                    <br />
                    With Rewards
                </>
            }
            paragraphs={[P_LONG, P_SHORT]}
            image="/images/Afilitate1.png"
            imageAlt="Two hands fitting coloured puzzle pieces together"
            imageSide="left"
            imageMaxW="max-w-[520px]"
        />

        <AffiliateSplit
            heading={
                <>
                    Are You Ready To
                    <br />
                    <span className="font-bold">Partner</span> With Us?
                </>
            }
            paragraphs={[P_LONG, P_SHORT]}
            image="/images/Afilitate2.png"
            imageAlt="Business partners, a globe, a meeting and a rising bar chart arranged in a circle"
            imageSide="right"
            imageMaxW="max-w-[500px]"
            bg="bg-[#f2f2f2]"
            cta={{ label: 'Learn About Our Amazon Services', href: '#services' }}
        />

        <AffiliateSplit
            heading={
                <>
                    Join Our <span className="font-bold">Affiliate Program</span>
                    <br className="hidden sm:block" /> From Anywhere Around
                    <br className="hidden sm:block" /> The Globe!
                </>
            }
            paragraphs={[P_LONG]}
            image="/images/Afilitate3.png"
            imageAlt="Hands reaching out of two laptops exchanging money and a light bulb idea"
            imageSide="left"
            imageMaxW="max-w-[540px]"
        />
    </>
);

export default AffiliateSections;