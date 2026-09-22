interface RibbonRowProps {
    background: string;
    textColor: string;
    rotate: number;
    reverse?: boolean;
    duration?: number;
    label?: string;
}

const RibbonRow = ({
    background,
    textColor,
    rotate,
    reverse = false,
    duration = 28,
    label = 'The Best Solution',
}: RibbonRowProps) => {
    const items = Array.from({ length: 10 });

    return (
        <div className="ribbon-row" style={{ background, transform: `rotate(${rotate}deg)` }}>
            <div
                className={`ribbon-row__track ${reverse ? 'ribbon-row__track--reverse' : ''}`}
                style={{ animationDuration: `${duration}s`, color: textColor }}
            >
                {[...items, ...items].map((_, i) => (
                    <span className="ribbon-row__item" key={i}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
                        </svg>
                        {label}
                    </span>
                ))}
            </div>
        </div>
    );
};

const Ribbon = () => {
    return (
        <div className="ribbon">
            <RibbonRow background="#2F2169" textColor="#FFFFFF" rotate={-2} duration={32} />
            <RibbonRow background="#8AC44B" textColor="#2F2169" rotate={1.5} reverse duration={26} />
        </div>
    );
};

export default Ribbon;