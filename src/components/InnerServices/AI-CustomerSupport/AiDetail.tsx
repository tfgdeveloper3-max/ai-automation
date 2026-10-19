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
        Scale Your Store Support <span className="font-bold">24/7</span>
        <br className="hidden md:block" /> Without Increasing Headcount
    </>
);

const DEFAULT_INTRO =
    'Transform how your e-commerce store handles customer inquiries with fully automated, intelligent support systems. Our AI agents integrate seamlessly with Amazon, Shopify, and TikTok Shop to provide instant, human-like responses around the clock\u2014reducing response times to seconds and dramatically improving customer satisfaction scores.';

const DEFAULT_PARAGRAPHS = [
    'Traditional customer support can be costly and difficult to scale during peak selling seasons. By automating repetitive requests such as order status tracking, shipping updates, return authorizations, and basic product questions, AMZ Automation frees up your internal support team to focus on high-value buyer interactions and complex issue resolution.',
    'Equipped with natural language understanding and multi-channel synchronization, our AI agents continuously learn from your brand\u2019s data and customer history. This ensures every customer receives accurate, personalized, and branded assistance instantly, preventing abandoned carts and building long-term buyer loyalty across all your sales channels.',
];

const AiServiceDetail = ({
    id = 'ai-customer-support',
    heading = DEFAULT_HEADING,
    intro = DEFAULT_INTRO,
    image = '/images/Ai-Support.png',
    imageAlt = 'Businessman touching a 24/7 service clock with support, phone, agent, email and chat icons',
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