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
        eBay <span className="font-bold">Automation</span>
    </>
);

const DEFAULT_INTRO =
    'eBay remains one of the largest and most reliable global e-commerce marketplaces, connecting sellers with hundreds of millions of active buyers. However, managing product listings, navigating Cassini search algorithms, handling buyer feedback, and keeping pricing competitive require continuous effort. At AMZ Automation, we automate and manage your entire eBay storefront\u2014handling product research, selling limit increases, and daily order logistics\u2014so you can generate consistent passive revenue.';

const DEFAULT_PARAGRAPHS = [
    'Our comprehensive eBay automation service focuses on establishing store trust and driving sustainable listing conversions. We conduct thorough product research to source high-margin, high-velocity inventory, craft SEO-optimized titles and item specifics, and run strategic Promoted Listing campaigns. By pairing real-time algorithmic price adjustments with compliance management, we maximize your visibility on top search results while protecting your margins.',
    'Beyond catalog optimization, our dedicated team manages all day-to-day operations seamlessly. From automated supplier sync and fast fulfillment tracking to 24/7 customer messaging and return processing, we maintain pristine seller ratings for your store. With complete operational control handled by experts, your eBay business grows into a resilient, scalable digital asset.',
];

const AutomatedServiceDetail = ({
    id = 'ebay-automation',
    heading = DEFAULT_HEADING,
    intro = DEFAULT_INTRO,
    image = '/images/ebay-Automation.png',
    imageAlt = 'eBay Marketplace automation dashboard with product listings, Cassini search SEO optimization, Promoted Listings campaigns, and order fulfillment workflow',
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

export default AutomatedServiceDetail;