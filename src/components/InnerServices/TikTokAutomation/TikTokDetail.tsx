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
        TikTok Shop <span className="font-bold">Automation</span>
    </>
);

const DEFAULT_INTRO =
    'Scaling a brand on TikTok requires mastering real-time trends, creator affiliate networks, and high-conversion live shopping events. At AMZ Automation, we manage the entire ecosystem for you\u2014from account verification and trending product research to affiliate coordination and order fulfillment\u2014allowing you to profit from the world\u2019s fastest-growing social commerce platform without lifting a finger.';

const DEFAULT_PARAGRAPHS = [
    'Our comprehensive TikTok Shop automation framework is built around the platform\u2019s unique algorithm. We curate trending products, optimize listings with high-intent keywords, and coordinate seamlessly with our vetted network of affiliate creators to promote your items on commission. This structure drives organic visibility and viral momentum straight to your storefront without heavy dependency on paid ad spend.',
    'Beyond content and creator outreach, our team handles the heavy lifting of daily operations, including automated inventory sync, order processing, tracking updates, and 24/7 customer service. With continuous performance tracking and strategic ad campaign management, your TikTok Shop runs efficiently on autopilot while generating steady, predictable revenue.',
];

const MultiServiceDetail = ({
    id = 'tiktok-shop-automation',
    heading = DEFAULT_HEADING,
    intro = DEFAULT_INTRO,
    image = '/images/Tiktok-Automation.png',
    imageAlt = 'TikTok Shop automation dashboard with trending products, creator affiliate network, live shopping events, and order fulfillment workflow',
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