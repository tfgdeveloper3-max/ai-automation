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
        <span className="font-bold">Revenue</span> &amp; Upsell Automation
    </>
);

const DEFAULT_INTRO =
    'Unlock hidden revenue potential in your e-commerce channels without increasing your ad spend. AMZ Automation builds data-driven, automated upsell and cross-sell engines that trigger targeted product recommendations, bundle discounts, and post-purchase offers at the exact moment customers are most likely to buy.';

const DEFAULT_PARAGRAPHS = [
    'Traditional post-purchase flows often rely on static email blasts that buyers ignore. Our intelligent automated funnels personalize recommendations based on individual shopping behavior, order history, and cart contents across Shopify, Amazon, and TikTok\u2014delivering high-converting offer sequences via SMS, email, and on-page widgets.',
    "From automated abandoned cart recovery sequences to instant one-click post-checkout upsells and subscription conversion flows, our revenue engines drive immediate bottom-line growth. Turn one-time shoppers into repeat buyers and scale your brand\u2019s profitability on complete autopilot.",
];

const MultiServiceDetail = ({
    id = 'revenue-upsell-automation',
    heading = DEFAULT_HEADING,
    intro = DEFAULT_INTRO,
    image = '/images/Multi-Channel.png',
    imageAlt = 'Illustration of automated upsell, cross-sell, and cart recovery funnels across Amazon, Shopify, and TikTok stores',
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

export default MultiServiceDetail;
