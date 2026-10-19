/* Star rating in square boxes. `value` can be a decimal (e.g. 4.6) for partial fill. */

const STAR_PATH = 'M12 3.5l2.5 5.6 6.1.6-4.6 4.1 1.3 6-5.3-3.1-5.3 3.1 1.3-6-4.6-4.1 6.1-.6z';

/* Colour by score, like review platforms: low = red/orange, high = green */
export const scoreColor = (value: number) => {
    if (value >= 4.2) return '#8ac44b';
    if (value >= 3.5) return '#b5d34a';
    if (value >= 2.5) return '#ffce00';
    if (value >= 1.5) return '#ff8622';
    return '#ff3722';
};

interface StarsProps {
    value: number;
    size?: 'sm' | 'md' | 'lg';
    label?: string;
}

const SIZES = { sm: 'h-[18px] w-[18px]', md: 'h-6 w-6', lg: 'h-8 w-8 sm:h-9 sm:w-9' };

const Stars = ({ value, size = 'md', label }: StarsProps) => {
    const color = scoreColor(value);

    return (
        <div className="flex gap-[3px]" role="img" aria-label={label ?? `Rated ${value} out of 5`}>
            {[0, 1, 2, 3, 4].map((i) => {
                const fill = Math.max(0, Math.min(1, value - i)); // 0 → 1 for this box
                return (
                    <span key={i} className={`relative inline-block overflow-hidden ${SIZES[size]}`} style={{ backgroundColor: '#dcdce6' }}>
                        <span className="absolute inset-y-0 left-0" style={{ width: `${fill * 100}%`, backgroundColor: color }} />
                        <svg viewBox="0 0 24 24" className="relative h-full w-full p-[12%]" fill="#fff" aria-hidden="true">
                            <path d={STAR_PATH} />
                        </svg>
                    </span>
                );
            })}
        </div>
    );
};

export default Stars;