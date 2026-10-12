import type { CSSProperties } from 'react';
import './HeroVisual.css';
const X0 = 230;
const Y0 = 140;
const CW = 1690;
const CH = 780;

const box = (x: number, y: number, w: number, h?: number): CSSProperties => ({
    left: `${((x - X0) / CW) * 100}%`,
    top: `${((y - Y0) / CH) * 100}%`,
    width: `${(w / CW) * 100}%`,
    ...(h ? { height: `${(h / CH) * 100}%` } : {}),
});

type Kind = 'robot' | 'bubble' | 'card' | 'icon' | 'draw';

interface Layer {
    src: string;
    x: number;
    y: number;
    w: number;
    h?: number;
    at: number;
    kind: Kind;
    z: number;
}

const IMG = '/images/hero';

const LAYERS: Layer[] = [
    { src: `${IMG}/robot.png`, x: 243, y: 524, w: 363, at: 0.1, kind: 'robot', z: 3 },

    { src: `${IMG}/bubble-order.png`, x: 554, y: 507, w: 393, at: 0.8, kind: 'bubble', z: 4 },
    { src: `${IMG}/bubble-check.png`, x: 581, y: 592, w: 365, at: 1.2, kind: 'bubble', z: 4 },

    { src: `${IMG}/lines.png`, x: 885, y: 256, w: 570, h: 611, at: 1.7, kind: 'draw', z: 1 },

    { src: `${IMG}/card-tracking.png`, x: 1353, y: 153, w: 277, at: 2.6, kind: 'card', z: 2 },
    { src: `${IMG}/icon-shopify.png`, x: 1633, y: 167, w: 271, at: 3.15, kind: 'icon', z: 2 },

    { src: `${IMG}/card-refund.png`, x: 1353, y: 410, w: 330, at: 3.45, kind: 'card', z: 2 },
    { src: `${IMG}/icon-amazon.png`, x: 1655, y: 366, w: 271, at: 4.0, kind: 'icon', z: 2 },

    { src: `${IMG}/icon-tiktok.png`, x: 1153, y: 705, w: 271, at: 4.3, kind: 'icon', z: 2 },
    { src: `${IMG}/card-discount.png`, x: 1415, y: 667, w: 369, at: 4.6, kind: 'card', z: 2 },

    { src: `${IMG}/bubble-return.png`, x: 740, y: 785, w: 243, at: 5.1, kind: 'bubble', z: 4 },
    { src: `${IMG}/bubble-label.png`, x: 648, y: 846, w: 318, at: 5.5, kind: 'bubble', z: 4 },
];

const CONNECTORS = [
    { x1: 1630, x2: 1716, y: 297, dot: 1662, at: 2.95 }, 
    { x1: 1683, x2: 1745, y: 507, dot: 1702, at: 3.8 }, 
];

const POP = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const SMOOTH = 'cubic-bezier(0.19, 1, 0.22, 1)';

const animationFor = (kind: Kind, at: number): CSSProperties => {
    switch (kind) {
        case 'robot':
            return {
                animation: `heroVisPop 0.8s ${POP} ${at}s both, heroVisFloat 4.5s ease-in-out ${at + 0.9}s infinite`,
                transformOrigin: '50% 80%',
            };
        case 'bubble':
            return { animation: `heroVisPop 0.55s ${POP} ${at}s both`, transformOrigin: '0% 100%' };
        case 'card':
            return { animation: `heroVisCard 0.75s ${SMOOTH} ${at}s both` };
        case 'icon':
            return {
                animation: `heroVisPop 0.5s ${POP} ${at}s both, heroVisGlow 3s ease-in-out ${at + 0.6}s infinite`,
                transformOrigin: '50% 50%',
            };
        case 'draw':
            return { animation: `heroVisDraw 1.2s ease-in-out ${at}s both` };
    }
};

interface HeroVisualProps {
    play?: boolean;
    className?: string;
}

const HeroVisual = ({ play = true, className = '' }: HeroVisualProps) => {
    const hidden: CSSProperties = { opacity: 0 };

    return (
        <div
            role="img"
            aria-label="AI assistant answering order, refund and return questions across Shopify, Amazon and TikTok"
            className={`relative aspect-[1690/780] w-full select-none ${className}`}
        >
            {LAYERS.map((l) => (
                <img
                    key={l.src}
                    src={l.src}
                    alt=""
                    draggable={false}
                    className={`hv-anim pointer-events-none absolute block max-w-none ${l.h ? 'object-fill' : 'h-auto'}`}
                    style={{ ...box(l.x, l.y, l.w, l.h), zIndex: l.z, ...(play ? animationFor(l.kind, l.at) : hidden) }}
                />
            ))}

            <svg
                aria-hidden="true"
                viewBox={`${X0} ${Y0} ${CW} ${CH}`}
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible"
            >
                {CONNECTORS.map((c, i) => (
                    <g key={i}>
                        <path
                            d={`M${c.x1} ${c.y} H${c.x2}`}
                            pathLength={1}
                            stroke="#5ee6a0"
                            strokeWidth={3}
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray="1"
                            className="hv-anim"
                            style={play ? { animation: `heroVisDash 0.35s ease-out ${c.at}s both` } : hidden}
                        />
                        <circle
                            cx={c.dot}
                            cy={c.y}
                            r={7}
                            fill="#5ee6a0"
                            className="hv-anim"
                            style={
                                play
                                    ? {
                                        animation: `heroVisPop 0.4s ${POP} ${c.at + 0.1}s both`,
                                        transformBox: 'fill-box',
                                        transformOrigin: 'center',
                                    }
                                    : hidden
                            }
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default HeroVisual;