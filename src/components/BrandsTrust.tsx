import type { CSSProperties } from 'react';
import { useSectionReveal } from './usesectionreveal';

const BRANDS = [
    { name: 'Culture Amp', src: '/images/CultureAmp.png' },
    { name: 'Contentful', src: '/images/Contentful.png' },
    { name: 'Dropbox', src: '/images/Dropbox.png' },
    { name: 'Airtable', src: '/images/Airtable.png' },
];

const BG: CSSProperties = {
    backgroundImage: [
        'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.035) 20%, transparent 35%, rgba(255,255,255,0.03) 55%, transparent 70%, rgba(255,255,255,0.025) 88%, transparent 100%)',
        'linear-gradient(90deg, #1d144f 0%, #221863 50%, #1d144f 100%)',
    ].join(', '),
};

const BrandsTrust = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.2 });

    const reveal = (i: number) => ({
        className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`,
        style: { transitionDelay: `${i * 110}ms` } as CSSProperties,
    });

    return (
        <section ref={ref} aria-labelledby="brands-trust-title" className="px-5 py-8 sm:px-8 sm:py-10 lg:py-12" style={BG}>
            <div className="mx-auto w-full max-w-[1100px] text-center">
                <h2
                    id="brands-trust-title"
                    className={`font-['Anybody',sans-serif] text-xl font-normal text-white sm:text-2xl lg:text-[28px] ${reveal(0).className}`}
                    style={reveal(0).style}
                >
                    1k+ Brands Trust Us
                </h2>

                <ul className="mt-6 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-6 sm:mt-7 md:flex md:justify-around md:gap-8">
                    {BRANDS.map((b, i) => {
                        const r = reveal(i + 1);
                        return (
                            <li key={b.name} className={r.className} style={r.style}>
                                <img
                                    src={b.src}
                                    alt={b.name}
                                    loading="lazy"
                                    className="h-7 w-auto opacity-90 transition-opacity hover:opacity-100 sm:h-8 lg:h-10"
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default BrandsTrust;