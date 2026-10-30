import { useSectionReveal } from '@/components/usesectionreveal';
import type { CSSProperties, ReactNode } from 'react';

interface ServiceDetailProps {
    id?: string;
    heading?: ReactNode;
    intro?: string;
    image?: string;
    imageAlt?: string;
    paragraphs?: string[];
}

const DEFAULT_HEADING = (
    <>
        Etsy <span className="font-bold">Automation</span>
    </>
);

const DEFAULT_INTRO =
    'Etsy has grown into a premier destination for unique, print-on-demand, custom, and curated product markets with highly motivated buyers. However, managing search visibility, maintaining shop policies, optimizing item tags, and coordinating fulfillment across specialized suppliers requires dedicated daily attention. At AMZ Automation, we manage your entire Etsy business\u2014from niche product selection and SEO listing optimization to automated shipping\u2014allowing you to scale a profitable digital asset completely hands-free.';

const DEFAULT_PARAGRAPHS = [
    'Our specialized Etsy automation framework is designed to capture organic search traffic and maximize shop conversions. We conduct extensive market research to identify trending, high-demand product niches with low competition. Our team crafts optimized titles, detailed descriptions, and high-converting search tags aligned with Etsy\u2019s search algorithm, positioning your listings in front of high-intent shoppers without relying solely on ad spend.',
    'Beyond store optimization, our dedicated specialists oversee all daily operational requirements. We integrate streamlined production and logistics networks for automated order processing, handle customer inquiries, and ensure strict compliance with Etsy\u2019s seller standards. With end-to-end management, your Etsy shop operates continuously as a low-maintenance, reliable revenue stream.',
];

const EtsyServiceDetail = ({
    id = 'etsy-automation',
    heading = DEFAULT_HEADING,
    intro = DEFAULT_INTRO,
    image = '/images/Etsy-Automation.png',
    imageAlt = 'Etsy Marketplace automation dashboard with niche product research, SEO listing optimization, search tags, and automated order fulfillment workflow',
    paragraphs = DEFAULT_PARAGRAPHS,
}: ServiceDetailProps) => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.12 });

    const reveal = (i: number, from = 'translate-y-8') => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100 ${inView ? 'opacity-100 translate-y-0 scale-100' : `opacity-0 ${from}`
            }`,
        style: { transitionDelay: `${i * 140}ms` } as CSSProperties,
    });

    const text = "font-['Montserrat',sans-serif] text-sm leading-[1.75] text-[#3a3a48] sm:text-[18px]";

    return (
        <section id={id} ref={ref} className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="mx-auto w-full max-w-[1100px] text-center">
                <div className={reveal(0).className} style={reveal(0).style}>
                    <h2 className="font-['Anybody',sans-serif] text-[28px] font-light leading-[1.2] text-[#111111] sm:text-[36px] lg:text-[44px] xl:text-[48px]">
                        {heading}
                    </h2>

                    <p className={`mx-auto mt-5 max-w-[920px] ${text}`}>{intro}</p>
                </div>

                <div className={`mt-6 sm:mt-8 ${reveal(1, 'translate-y-8 scale-[0.98]').className}`} style={reveal(1).style}>
                    <img
                        src={image}
                        alt={imageAlt}
                        loading="lazy"
                        className="block h-auto w-full rounded-2xl sm:rounded-[20px]"
                    />
                </div>

                <div className={`mx-auto mt-8 max-w-[920px] space-y-6 sm:mt-10 ${reveal(2).className}`} style={reveal(2).style}>
                    {paragraphs.map((p, i) => (
                        <p key={i} className={text}>
                            {p}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EtsyServiceDetail;