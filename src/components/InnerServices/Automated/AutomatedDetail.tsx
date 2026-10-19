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
        <span className="font-bold">Automated</span> Order &amp; Returns
    </>
);

const DEFAULT_INTRO =
    'Simplify your post-purchase operations with completely hands-free order processing and return workflows. Our automated platform connects directly with Amazon, Shopify, and TikTok Shop to route orders, generate shipping labels, and manage customer returns instantly\u2014eliminating costly delays and operational overhead.';

const DEFAULT_PARAGRAPHS = [
    'Handling return requests, RMA generation, and status updates manually creates friction for customers and drains internal resources. AMZ Automation automates the entire return portal lifecycle, giving buyers immediate return labels and instant exchange options while systematically updating inventory counts in real time.',
    'With real-time order tracking notifications and automated exception handling, your store delivers a seamless end-to-end shopping experience. By reducing return processing times and minimizing order error rates, you increase customer lifetime value, protect seller account metrics, and maintain effortless multi-channel growth.',
];

const AutomatedServiceDetail = ({
    id = 'automated-order-returns',
    heading = DEFAULT_HEADING,
    intro = DEFAULT_INTRO,
    image = '/images/Automated.png',
    imageAlt = 'Illustration of automated order processing and return workflows across Amazon, Shopify, and TikTok stores',
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