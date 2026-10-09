const ITEMS_PER_GROUP = 12;

const Burst = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden="true">
        <path d="M12 0 14.4 7.2 21 3 16.8 9.6 24 12 16.8 14.4 21 21 14.4 16.8 12 24 9.6 16.8 3 21 7.2 14.4 0 12 7.2 9.6 3 3 9.6 7.2Z" />
    </svg>
);

const Group = ({ hidden = false }: { hidden?: boolean }) => (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
        {Array.from({ length: ITEMS_PER_GROUP }).map((_, i) => (
            <span
                key={i}
                className="inline-flex items-center gap-2.5 whitespace-nowrap px-4 text-sm font-bold text-white sm:px-6 sm:text-lg lg:text-xl"
            >
                <Burst />
                The Best Solution
            </span>
        ))}
    </div>
);

type BandProps = { className: string; reverse?: boolean; duration?: string };

/* Band is 120% wide and centred with flex, so its rotated ends never show
   inside the viewport (no negative margins / offsets needed). */
const Band = ({ className, reverse = false, duration = '40s' }: BandProps) => (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[120%] shrink-0 overflow-hidden py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] sm:py-3 ${className}`}>
            <div
                className="flex w-max animate-[ribbonScroll_40s_linear_infinite] motion-reduce:animate-none"
                style={{ animationDuration: duration, animationDirection: reverse ? 'reverse' : 'normal' }}
            >
                <Group />
                <Group hidden />
            </div>
        </div>
    </div>
);

const Ribbon = () => (
    <div className="pointer-events-none relative z-20 h-24 overflow-hidden sm:h-32 lg:h-36" role="presentation">
        {/* Back: green, rising to the right */}
        <Band className="rotate-[-2.5deg] bg-[#8ac44b]" reverse duration="45s" />
        {/* Front: navy, falling to the right */}
        <Band className="rotate-[2.5deg] bg-[#1a1356]" />
    </div>
);

export default Ribbon;