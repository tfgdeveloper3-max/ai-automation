import type { CSSProperties, ReactNode } from 'react';
import { useSectionReveal } from '../usesectionreveal';
import { useLeadModal } from '../leadModalContext';

const P_REFERRAL_1 =
    'Partnering with AMZ Automation allows agencies, consultants, and e-commerce professionals to generate recurring revenue by recommending our proven AI automation solutions. When you refer online store owners looking to streamline their Amazon, Shopify, or TikTok operations, you earn generous commission payouts for every client that signs up.';

const P_REFERRAL_2 =
    'We handle all the technical onboarding, setup, and client support while you reap the rewards. It\u2019s a simple, high-value partnership designed to help you monetize your network and deliver real automation impact to growing e-commerce brands.';

const P_PARTNER_1 =
    'Joining the AMZ Automation affiliate and referral network gives you direct access to competitive commission structures, dedicated partner support, and real-time tracking dashboards. Whether you run an agency, manage e-commerce clients, or create content for online sellers, our program is designed to help you monetize your audience effortlessly.';

const P_PARTNER_2 =
    'Get started today and start earning recurring rewards by helping Amazon, Shopify, and TikTok brands automate their fulfillment, inventory, and customer support pipelines.';

const P_GLOBAL =
    'At AMZ Automation, our affiliate partner network knows no borders. No matter where you are in the world, you can connect e-commerce store owners on Amazon, Shopify, and TikTok with our powerful AI automation tools. Earn reliable, recurring commissions, track your referrals seamlessly, and grow your passive income alongside a global leader in e-commerce workflows.';

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

    const { openLeadForm } = useLeadModal();

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
                            className="mt-4 max-w-[600px] font-['Montserrat',sans-serif] text-sm leading-[1.7] text-[#3a3a48] lg:text-[18px]"
                        >
                            {p}
                        </p>
                    ))}

                    {cta && (
                        <div className="mt-7 flex items-center gap-2">
                            <button
                                type='button'
                                onClick={openLeadForm}
                                className="inline-flex h-11 items-center rounded-full bg-[#8ac44b] px-6 font-['Montserrat',sans-serif] text-[13px] font-medium text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1650] sm:px-8 sm:text-sm"
                            >
                                {cta.label}
                            </button>
                            <button
                                type='button'
                                onClick={openLeadForm}
                                aria-label={cta.label}
                                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8ac44b] text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d1650]"
                            >
                                <ChevronsRight className="h-5 w-5" />
                            </button>
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
            paragraphs={[P_REFERRAL_1, P_REFERRAL_2]}
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
            paragraphs={[P_PARTNER_1, P_PARTNER_2]}
            image="/images/Afilitate2.png"
            imageAlt="Business partners, a globe, a meeting and a rising bar chart arranged in a circle"
            imageSide="right"
            imageMaxW="max-w-[500px]"
            bg="bg-[#f2f2f2]"
            cta={{ label: 'Become a Partner Today', href: '#services' }}
        />

        <AffiliateSplit
            heading={
                <>
                    Join Our <br /><span className="font-bold">Affiliate Program</span>
                    <br className="hidden sm:block" /> From Anywhere Around
                    <br className="hidden sm:block" /> The Globe!
                </>
            }
            paragraphs={[P_GLOBAL]}
            image="/images/Afilitate3.png"
            imageAlt="Hands reaching out of two laptops exchanging money and a light bulb idea"
            imageSide="left"
            imageMaxW="max-w-[540px]"
        />
    </>
);

export default AffiliateSections;