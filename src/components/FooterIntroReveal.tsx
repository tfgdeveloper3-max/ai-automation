import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

/** Six nodes arranged in a hexagon around a 300,300 center in a 600x600 viewBox. */
const NODES = [
    { x: 300, y: 80 },
    { x: 490.5, y: 190 },
    { x: 490.5, y: 410 },
    { x: 300, y: 520 },
    { x: 109.5, y: 410 },
    { x: 109.5, y: 190 },
] as const;

const CENTER = { x: 300, y: 300 };

const TICKER_LINES = [
    "Analyzing workflows",
    "Connecting integrations",
    "Deploying AI agents",
    "Optimizing in real time",
];

/** Gentle ease-in-out so the scroll-driven scale/opacity accelerate and settle
 *  instead of tracking scroll position linearly. */
function easeInOutCubic(t: number) {
    const c = Math.min(Math.max(t, 0), 1);
    return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

export default function FooterIntroReveal({
    title = "Let's Automate",
}: {
    title?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Softer spring so the reveal glides rather than snapping to the wheel.
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 45,
        damping: 22,
        mass: 0.45,
        restDelta: 0.0005,
    });

    // Re-shape the eased progress once, then derive everything else from it
    // so all the moving pieces accelerate/settle in sync.
    const eased = useTransform(smoothProgress, easeInOutCubic);

    const circleScale = useTransform(eased, [0, 0.55], [0.45, 2.8]);
    // Animating font-size (not transform: scale) keeps the glyphs crisp —
    // scaling an already-rasterized text element blurs it at large factors,
    // especially once a filter/drop-shadow forces the browser to pre-rasterize
    // before the transform is applied.
    const textFontSize = useTransform(eased, [0, 0.5, 0.55], [30, 102, 108]);
    const bgColor = useTransform(
        eased,
        [0, 0.5, 0.6],
        ["#04060c", "#04060c", "#000000"]
    );

    const gridOpacity = useTransform(eased, [0, 0.35], [0.35, 0]);
    const ringOpacity = useTransform(eased, [0, 0.15, 0.55], [0, 0.9, 0]);
    const ringRotate = useTransform(eased, [0, 1], [0, 220]);
    const glowOpacity = useTransform(eased, [0, 0.3, 0.6], [0.6, 1, 0]);

    // the network of connector lines fades with the same window as the grid
    const networkOpacity = useTransform(eased, [0, 0.15, 0.4], [0, 1, 0]);

    return (
        <div
            ref={containerRef}
            className="relative h-[150vh] w-full"
            style={{ backgroundColor: '#000000' }}
        >
            <motion.div
                style={{ backgroundColor: bgColor }}
                className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
            >
                {/* circuit grid backdrop */}
                <motion.div
                    style={{ opacity: gridOpacity, willChange: "opacity" }}
                    className="pointer-events-none absolute inset-0"
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
                            backgroundSize: "7.14% 7.14%",
                            maskImage:
                                "radial-gradient(circle at center, black 0%, black 35%, transparent 75%)",
                            WebkitMaskImage:
                                "radial-gradient(circle at center, black 0%, black 35%, transparent 75%)",
                        }}
                    />
                </motion.div>

                {/* AI network: nodes + flowing connectors converging on the core */}
                <motion.div
                    style={{ opacity: networkOpacity, willChange: "opacity" }}
                    className="pointer-events-none absolute h-[62vmin] w-[62vmin]"
                >
                    <svg
                        viewBox="0 0 600 600"
                        className="h-full w-full overflow-visible"
                    >
                        <defs>
                            <linearGradient id="lineFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
                                <stop offset="45%" stopColor="#67e8f9" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {NODES.map((n, i) => (
                            <line
                                key={`line-${i}`}
                                x1={n.x}
                                y1={n.y}
                                x2={CENTER.x}
                                y2={CENTER.y}
                                stroke="url(#lineFlow)"
                                strokeWidth={2}
                                strokeDasharray="10 14"
                                className="ai-flow-line"
                                style={{ animationDelay: `${i * -0.35}s` }}
                            />
                        ))}

                        {NODES.map((n, i) => (
                            <circle
                                key={`node-${i}`}
                                cx={n.x}
                                cy={n.y}
                                r={6}
                                fill="#67e8f9"
                                className="ai-node-pulse"
                                style={{
                                    animationDelay: `${i * 0.3}s`,
                                    filter: "drop-shadow(0 0 6px rgba(103,232,249,0.9))",
                                }}
                            />
                        ))}
                    </svg>
                </motion.div>

                {/* rotating tech ring around the orb */}
                <motion.div
                    style={{ opacity: ringOpacity, rotate: ringRotate, willChange: "transform, opacity" }}
                    className="pointer-events-none absolute h-[46vmin] w-[46vmin] rounded-full"
                >
                    <div
                        className="h-full w-full rounded-full"
                        style={{
                            background:
                                "conic-gradient(from 0deg, transparent 0deg, rgba(34,211,238,0.9) 40deg, transparent 90deg, rgba(139,92,246,0.9) 200deg, transparent 260deg, transparent 360deg)",
                            WebkitMask:
                                "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                            mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                        }}
                    />
                </motion.div>

                {/* outer glow halo behind the orb */}
                <motion.div
                    style={{ scale: circleScale, opacity: glowOpacity, willChange: "transform, opacity" }}
                    className="absolute h-[70vmin] w-[70vmin] rounded-full blur-3xl"
                >
                    <div
                        className="h-full w-full rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(34,211,238,0.45) 0%, rgba(139,92,246,0.35) 45%, transparent 70%)",
                        }}
                    />
                </motion.div>

                {/* the orb itself, with an internal scanning beam */}
                <motion.div
                    style={{ scale: circleScale, willChange: "transform" }}
                    className="absolute h-[100vmin] w-[100vmin] overflow-hidden rounded-full"
                >
                    <div
                        className="h-full w-full rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle at 38% 35%, #1a2440 0%, #0a0e1c 38%, #030308 68%, #000000 100%)",
                            boxShadow:
                                "inset 0 0 120px 20px rgba(34,211,238,0.08), inset 0 0 60px rgba(139,92,246,0.12)",
                        }}
                    />
                    <div className="ai-scan-beam pointer-events-none absolute inset-0" />
                </motion.div>

                {/* headline + automation ticker */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <motion.p
                        style={{
                            fontSize: textFontSize,
                            willChange: "font-size",
                            WebkitFontSmoothing: "antialiased",
                            textRendering: "optimizeLegibility",
                        }}
                        className="whitespace-nowrap font-bold tracking-wide"
                    >
                        <span
                            style={{
                                backgroundImage:
                                    "linear-gradient(90deg, #67e8f9 0%, #a78bfa 55%, #67e8f9 100%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                // text-shadow (not filter: drop-shadow) — filter forces the
                                // browser to pre-rasterize the element before it's resized,
                                // which is what was causing the blur on zoom.
                                textShadow: "0 0 18px rgba(103,232,249,0.35)",
                            }}
                        >
                            {title}
                        </span>
                    </motion.p>

                    <div className="ai-ticker relative h-5 w-64 overflow-hidden text-center font-mono text-xs tracking-wide text-cyan-200/80 sm:w-72">
                        {TICKER_LINES.map((line, i) => (
                            <span
                                key={line}
                                className="ai-ticker-line absolute inset-0 flex items-center justify-center"
                                style={{ animationDelay: `${i * 3}s` }}
                            >
                                {line}
                                <span className="ai-ticker-cursor ml-1 inline-block h-3 w-[2px] bg-cyan-300" />
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            <style>{`
                @keyframes ai-node-pulse {
                    0%, 100% { opacity: 0.35; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.7); }
                }
                .ai-node-pulse {
                    transform-origin: center;
                    transform-box: fill-box;
                    animation: ai-node-pulse 2.2s ease-in-out infinite;
                }

                @keyframes ai-flow-line {
                    to { stroke-dashoffset: -240; }
                }
                .ai-flow-line {
                    animation: ai-flow-line 3.2s linear infinite;
                }

                @keyframes ai-scan-beam-move {
                    0% { transform: translateY(-60%); opacity: 0; }
                    15% { opacity: 0.8; }
                    85% { opacity: 0.8; }
                    100% { transform: translateY(60%); opacity: 0; }
                }
                .ai-scan-beam {
                    background: linear-gradient(
                        180deg,
                        transparent 0%,
                        rgba(103, 232, 249, 0.28) 48%,
                        rgba(103, 232, 249, 0.5) 50%,
                        rgba(103, 232, 249, 0.28) 52%,
                        transparent 100%
                    );
                    height: 14%;
                    animation: ai-scan-beam-move 3.6s ease-in-out infinite;
                }

                @keyframes ai-ticker-fade {
                    0%, 4% { opacity: 0; transform: translateY(4px); }
                    8%, 17% { opacity: 1; transform: translateY(0); }
                    21%, 100% { opacity: 0; transform: translateY(-4px); }
                }
                .ai-ticker-line {
                    opacity: 0;
                    animation: ai-ticker-fade 12s ease-in-out infinite;
                }

                @keyframes ai-ticker-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .ai-ticker-cursor {
                    animation: ai-ticker-blink 0.9s steps(1) infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .ai-node-pulse, .ai-flow-line, .ai-scan-beam, .ai-ticker-line, .ai-ticker-cursor {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
}