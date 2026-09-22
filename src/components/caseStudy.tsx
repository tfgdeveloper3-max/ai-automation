import React from "react";
import { useSectionReveal } from './usesectionreveal';

type Story = {
    src: string;
    alt: string;
    aspect: string;
};

const TOP_ROW: Story[] = [
    {
        src: "/images/image1.jpg",
        alt: "Mobile sales dashboard with KPI tiles and hourly sales chart",
        aspect: "aspect-[217/385]",
    },
    {
        src: "/images/image2.png",
        alt: "Product sales chart for the last 30 days with management shortcuts",
        aspect: "aspect-[293/385]",
    },
    {
        src: "/images/image3.jpg",
        alt: "Sales summary cards and product sales chart with order counts",
        aspect: "aspect-[217/385]",
    },
];

const BOTTOM_ROW: Story[] = [
    {
        src: "/images/image4.jpg",
        alt: "Analytics dashboard with status, progress and combined bar-line charts",
        aspect: "aspect-[393/225]",
    },
    {
        src: "/images/image5.png",
        alt: "Sales analytics dashboard with donut, bar and line charts",
        aspect: "aspect-[343/225]",
    },
];

const Tile: React.FC<Story> = ({ src, alt, aspect }) => (
    <div
        className={`${aspect} w-full overflow-hidden border border-gray-300 bg-white shadow-sm`}
    >
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover object-top"
        />
    </div>
);

const SuccessStories: React.FC = () => {
    const { ref, inView } = useSectionReveal<HTMLElement>({ threshold: 0.12 });

    return (
        <section
            ref={ref}
            data-reveal="fade-up"
            data-inview={inView}
            className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16"
        >
            <header className="mb-8 flex flex-col items-center gap-2 sm:mb-10">
                <span className="rounded-full bg-[#7CC242] px-6 py-0.5 text-[11px] font-medium text-white">
                    Case Study
                </span>

                <h2
                    className="text-4xl leading-tight tracking-tight text-black sm:text-[40px]"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    <span className="font-bold">Success</span>{" "}
                    <span className="font-normal">Stories</span>
                </h2>
            </header>

            {/* Grid */}
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3">
                {/* Top Row */}
                <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[217fr_293fr_217fr] sm:gap-3.5">
                    {TOP_ROW.map((story) => (
                        <Tile key={story.src} {...story} />
                    ))}
                </div>

                {/* Bottom Row */}
                <div className="mt-3 grid grid-cols-1 items-start gap-3 sm:grid-cols-[393fr_343fr] sm:gap-[18px]">
                    {BOTTOM_ROW.map((story) => (
                        <Tile key={story.src} {...story} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;