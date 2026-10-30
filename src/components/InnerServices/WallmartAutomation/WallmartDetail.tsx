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
        Walmart <span className="font-bold">Automation</span>
    </>
);

const DEFAULT_INTRO =
    'Securing a foothold on Walmart Marketplace gives your retail brand direct access to millions of high-intent online shoppers. However, strict seller metrics, application requirements, and logistics compliance can present steep entry barriers. At AMZ Automation, we manage your entire Walmart presence\u2014handling account approvals, product catalog integration, and daily operation metrics\u2014so you can build a profitable marketplace asset without operational friction.';

const DEFAULT_PARAGRAPHS = [
    'Our specialized Walmart automation service streamlines every phase of marketplace growth. We assist in navigating Walmart\u2019s rigorous vetting process, optimizing product listings for Walmart\u2019s Search SEO algorithm, and configuring price dynamics to keep your listings competitive. By combining empirical data analysis with proven listing strategies, we ensure your catalog achieves high visibility and consistent Buy Box placement.',
    'Beyond catalog setup, our management team takes complete responsibility for backend operations. From automated inventory sync and multi-channel fulfillment to 24/7 buyer communications and performance metric tracking, we keep your account in top standing with Walmart\u2019s strict seller policies while delivering consistent, hands-off monthly revenues.',
];

const SmartServiceDetail = ({
    id = 'walmart-automation',
    heading = DEFAULT_HEADING,
    intro = DEFAULT_INTRO,
    image = '/images/Walmart-Automation.png',
    imageAlt = 'Walmart Marketplace automation dashboard with seller account approvals, product catalog integration, Buy Box placement, and fulfillment workflow',
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

export default SmartServiceDetail;