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
        Shopify <span className="font-bold">Automation</span>
    </>
);

const DEFAULT_INTRO =
    'Building a successful direct-to-consumer brand on Shopify requires more than just launching a website\u2014it demands strategic product selection, conversion-focused design, and seamless backend fulfillment. At AMZ Automation, we take the complexity out of running your store by managing every operational step, allowing you to own a fully functional, high-growth e-commerce asset without the daily operational stress.';

const DEFAULT_PARAGRAPHS = [
    'Our comprehensive Shopify automation service covers everything from initial brand conceptualization to continuous optimization. We build custom-designed, mobile-responsive storefronts optimized for maximum conversion rates, integrate reliable supplier networks, and set up automated inventory control. By pairing data-driven product research with aggressive customer acquisition strategies, AMZ Automation positions your store to attract targeted traffic and convert visitors into repeat customers effortlessly.',
    'Beyond store setup, our dedicated team continuously monitors sales performance, manages customer inquiries, and streamlines order processing from warehouse to doorstep. With continuous A/B testing, dynamic sales funnels, and automated marketing workflows in place, your Shopify business stays ahead of market trends while providing you with transparent, hands-off passive revenue growth.',
];

const AiServiceDetail = ({
    id = 'shopify-automation',
    heading = DEFAULT_HEADING,
    intro = DEFAULT_INTRO,
    image = '/images/Shopify-Automation.png',
    imageAlt = 'Shopify automation storefront with product listings, dashboard analytics, and order fulfillment workflow',
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

export default AiServiceDetail;