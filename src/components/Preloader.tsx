import { useEffect, useRef, useState } from 'react';
import './Preloader.css';

export interface PreloaderProps {
    text?: string;
    minDuration?: number;
    onFinished?: () => void;
    backgroundColor?: string;
    color?: string;
    highlightColor?: string;
}

type Rgb = { r: number; g: number; b: number };
type Pixel = {
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
};

const hexToRgb = (hex: string): Rgb | null => {
    const clean = hex.replace('#', '').trim();
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
    return {
        r: parseInt(clean.slice(0, 2), 16),
        g: parseInt(clean.slice(2, 4), 16),
        b: parseInt(clean.slice(4, 6), 16),
    };
};

const mixRgb = (from: Rgb, to: Rgb, amount: number): Rgb => ({
    r: Math.round(from.r + (to.r - from.r) * amount),
    g: Math.round(from.g + (to.g - from.g) * amount),
    b: Math.round(from.b + (to.b - from.b) * amount),
});

const rgbToCss = (rgb: Rgb): string => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);
const easeOutBack = (t: number): number => {
    const c1 = 1.4;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const PIXEL_SIZE = 5; 
const GAP = 2; 
const SWEEP_DURATION = 1300; 
const POP_DURATION = 170; 

export default function Preloader({
    text = 'AI AUTOMATION',
    minDuration = 1800,
    onFinished,
    backgroundColor = '#0e0531',
    color = '#ffffff',
    highlightColor = '#8AC44B',
}: PreloaderProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [fading, setFading] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        let cancelled = false;
        const start = performance.now();

        const waitLoad = new Promise<void>((resolve) => {
            if (document.readyState === 'complete') {
                resolve();
                return;
            }
            window.addEventListener('load', () => resolve(), { once: true });
        });

        waitLoad.then(() => {
            if (cancelled) return;
            const elapsed = performance.now() - start;
            const remaining = Math.max(0, minDuration - elapsed);
            window.setTimeout(() => {
                if (!cancelled) setFading(true);
            }, remaining);
        });

        return () => {
            cancelled = true;
            document.body.style.overflow = prevOverflow;
        };
    }, [minDuration]);

    useEffect(() => {
        if (!fading) return;
        const t = window.setTimeout(() => {
            setHidden(true);
            onFinished?.();
        }, 650);
        return () => window.clearTimeout(t);
    }, [fading, onFinished]);

    useEffect(() => {
        if (hidden) return;
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let pixels: Pixel[] = [];
        let animationFrame: number | null = null;
        let startTime = 0;
        let width = 0;
        let height = 0;
        let dpr = 1;
        let minX = 0;
        let maxX = 0;
        const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

        const drawPixel = (p: Pixel, alpha: number, scale: number) => {
            if (alpha <= 0 || scale <= 0) return;
            const s = p.size * scale;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        };

        const render = (now: number) => {
            ctx.clearRect(0, 0, width, height);
            const elapsed = now - startTime;
            let complete = true;

            pixels.forEach((p) => {
                const local = elapsed - p.delay;
                if (local <= 0) {
                    complete = false;
                    return;
                }
                const progress = clamp(local / POP_DURATION, 0, 1);
                if (progress < 1) complete = false;
                const eased = easeOutBack(progress);
                drawPixel(p, clamp(progress * 1.3, 0, 1), eased);
            });
            ctx.globalAlpha = 1;

            // scanning bar sweeping left -> right while the text is still writing
            const sweepT = clamp(elapsed / SWEEP_DURATION, 0, 1);
            if (sweepT < 1 && maxX > minX) {
                const barX = minX + (maxX - minX) * sweepT;
                const grad = ctx.createLinearGradient(barX - 14, 0, barX + 14, 0);
                grad.addColorStop(0, 'rgba(138,196,75,0)');
                grad.addColorStop(0.5, 'rgba(138,196,75,0.9)');
                grad.addColorStop(1, 'rgba(138,196,75,0)');
                ctx.fillStyle = grad;
                ctx.fillRect(barX - 14, 0, 28, height);
            }

            if (complete) {
                animationFrame = null;
            } else {
                animationFrame = window.requestAnimationFrame(render);
            }
        };

        const sampleText = () => {
            const rect = container.getBoundingClientRect();
            width = Math.floor(rect.width);
            height = Math.floor(rect.height);
            if (width <= 0 || height <= 0) return;

            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.max(1, Math.floor(width * dpr));
            canvas.height = Math.max(1, Math.floor(height * dpr));
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            let resolvedSize = Math.min(width, height) * 0.24;
            const fontWeight = 800;
            const computedFamily = window.getComputedStyle(container).fontFamily;
            const fontFamily = computedFamily && computedFamily.trim() ? computedFamily : 'sans-serif';
            let font = `${fontWeight} ${resolvedSize}px ${fontFamily}`;

            const offscreen = document.createElement('canvas');
            const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
            if (!offCtx) return;

            const maxTextWidth = width * 0.86;
            offCtx.font = font;
            let metrics = offCtx.measureText(text);
            if (metrics.width > maxTextWidth) {
                resolvedSize = Math.max(16, resolvedSize * (maxTextWidth / metrics.width));
                font = `${fontWeight} ${resolvedSize}px ${fontFamily}`;
                offCtx.font = font;
                metrics = offCtx.measureText(text);
            }

            const left = Math.ceil(metrics.actualBoundingBoxLeft || 0);
            const right = Math.ceil(metrics.actualBoundingBoxRight || metrics.width);
            const ascent = Math.ceil(metrics.actualBoundingBoxAscent || resolvedSize * 0.78);
            const descent = Math.ceil(metrics.actualBoundingBoxDescent || resolvedSize * 0.22);
            const padding = Math.max(10, Math.ceil(resolvedSize * 0.08));
            const textWidth = Math.max(1, left + right);
            const textHeight = Math.max(1, ascent + descent);

            offscreen.width = textWidth + padding * 2;
            offscreen.height = textHeight + padding * 2;
            offCtx.font = font;
            offCtx.textAlign = 'left';
            offCtx.textBaseline = 'alphabetic';
            offCtx.fillStyle = '#ffffff';
            offCtx.fillText(text, padding - left, padding + ascent);

            const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
            const step = PIXEL_SIZE + GAP;
            const rawTargets: { x: number; y: number; alpha: number }[] = [];

            for (let y = 0; y < offscreen.height; y += step) {
                for (let x = 0; x < offscreen.width; x += step) {
                    const alpha = imageData.data[(y * offscreen.width + x) * 4 + 3];
                    if (alpha > 60) {
                        rawTargets.push({
                            x: width / 2 - offscreen.width / 2 + x,
                            y: height / 2 - offscreen.height / 2 + y,
                            alpha: alpha / 255,
                        });
                    }
                }
            }

            if (rawTargets.length === 0) {

                pixels = [];
                return;
            }

            minX = rawTargets.reduce((min, t) => Math.min(min, t.x), Infinity);
            maxX = rawTargets.reduce((max, t) => Math.max(max, t.x), -Infinity);
            const span = Math.max(1, maxX - minX);

            const baseRgb = hexToRgb(color);
            const highlightRgb = hexToRgb(highlightColor);

            pixels = rawTargets.map((target, index) => {
                const seed = ((index * 9301 + 49297) % 233280) / 233280;
                const normX = (target.x - minX) / span;
                const blend = baseRgb && highlightRgb ? clamp(normX + (seed - 0.5) * 0.2, 0, 1) : 0;
                const pixelColor = baseRgb && highlightRgb ? rgbToCss(mixRgb(baseRgb, highlightRgb, blend)) : color;

                const delay = reducedMotion ? 0 : normX * SWEEP_DURATION + seed * 45;

                return {
                    x: target.x,
                    y: target.y,
                    size: PIXEL_SIZE * (0.85 + target.alpha * 0.3),
                    color: pixelColor,
                    delay,
                };
            });

            if (reducedMotion) {
                ctx.clearRect(0, 0, width, height);
                pixels.forEach((p) => drawPixel(p, 1, 1));
                if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
                animationFrame = null;
                return;
            }

            startTime = performance.now();
            if (animationFrame === null) animationFrame = window.requestAnimationFrame(render);
        };

        sampleText();
        const resizeObserver = new ResizeObserver(sampleText);
        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
        };
    }, [text, color, highlightColor, hidden]);

    if (hidden) return null;

    return (
        <div
            className={`preloader${fading ? ' preloader--fading' : ''}`}
            style={{ backgroundColor }}
            role="status"
            aria-live="polite"
        >
            <div ref={containerRef} className="preloader__stage">
                <canvas ref={canvasRef} className="preloader__canvas" aria-hidden="true" />
            </div>
            <span className="preloader__sr">{text} — loading</span>
        </div>
    );
}