import { useEffect, useRef, useState } from 'react';
import './Preloader.css';

export interface PreloaderProps {
    /** Use "|" (or a real newline) to break lines, e.g. "AMZ|AUTOMATION SOLUTIONS" */
    text?: string;
    minDuration?: number;
    onFinished?: () => void;
    backgroundColor?: string;
    /** Colour of the other lines */
    color?: string;
    /** Colour of the first line ("AMZ") */
    highlightColor?: string;
    fontFamily?: string;
}

type Pixel = { x: number; y: number; size: number; color: string; delay: number };

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const easeOutBack = (t: number) => {
    const c1 = 1.4;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const SWEEP_DURATION = 1300;
const POP_DURATION = 170;
const FONT_WEIGHT = 800;
const ROWS_PER_LETTER = 11; // how many pixel rows each capital letter gets → readability
const NARROW_BREAKPOINT = 520; // below this width, every word goes on its own line

/** Split on "|" or newline; on narrow screens also put each word on its own line */
const buildLines = (text: string, width: number): string[] => {
    const lines = text
        .split(/\n|\|/)
        .map((l) => l.trim())
        .filter(Boolean);
    if (width >= NARROW_BREAKPOINT) return lines;
    return lines.flatMap((l) => l.split(/\s+/));
};

export default function Preloader({
    text = 'AMZ|AUTOMATION SOLUTIONS',
    minDuration = 2400,
    onFinished,
    backgroundColor = '#0e0531',
    color = '#ffffff',
    highlightColor = '#8AC44B',
    fontFamily = "'Anybody', 'DM Sans', 'Montserrat', sans-serif",
}: PreloaderProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [fading, setFading] = useState(false);
    const [hidden, setHidden] = useState(false);

    /* ---------- lock scroll + finish after load / minDuration ---------- */
    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        let cancelled = false;
        const start = performance.now();

        const waitLoad = new Promise<void>((resolve) => {
            if (document.readyState === 'complete') return resolve();
            window.addEventListener('load', () => resolve(), { once: true });
        });

        waitLoad.then(() => {
            if (cancelled) return;
            const remaining = Math.max(0, minDuration - (performance.now() - start));
            window.setTimeout(() => !cancelled && setFading(true), remaining);
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

    /* ---------- pixel text ---------- */
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
        let minX = 0;
        let maxX = 0;
        let minY = 0;
        let maxY = 0;
        let disposed = false;
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

            for (const p of pixels) {
                const local = elapsed - p.delay;
                if (local <= 0) {
                    complete = false;
                    continue;
                }
                const progress = clamp(local / POP_DURATION, 0, 1);
                if (progress < 1) complete = false;
                drawPixel(p, clamp(progress * 1.3, 0, 1), easeOutBack(progress));
            }
            ctx.globalAlpha = 1;

            // green scan bar, only as tall as the text
            const sweepT = clamp(elapsed / SWEEP_DURATION, 0, 1);
            if (sweepT < 1 && maxX > minX) {
                const barX = minX + (maxX - minX) * sweepT;
                const grad = ctx.createLinearGradient(barX - 14, 0, barX + 14, 0);
                grad.addColorStop(0, 'rgba(138,196,75,0)');
                grad.addColorStop(0.5, 'rgba(138,196,75,0.85)');
                grad.addColorStop(1, 'rgba(138,196,75,0)');
                ctx.fillStyle = grad;
                ctx.fillRect(barX - 14, minY - 10, 28, maxY - minY + 20);
            }

            animationFrame = complete ? null : window.requestAnimationFrame(render);
        };

        /* draw text with letter-spacing (wider gaps = easier to read as pixels) */
        const measureSpaced = (c: CanvasRenderingContext2D, line: string, spacing: number) =>
            [...line].reduce((w, ch) => w + c.measureText(ch).width, 0) + spacing * (line.length - 1);

        const fillSpaced = (c: CanvasRenderingContext2D, line: string, x: number, y: number, spacing: number) => {
            let cx = x;
            for (const ch of line) {
                c.fillText(ch, cx, y);
                cx += c.measureText(ch).width + spacing;
            }
        };

        const sampleText = () => {
            if (disposed) return;
            const rect = container.getBoundingClientRect();
            width = Math.floor(rect.width);
            height = Math.floor(rect.height);
            if (width <= 0 || height <= 0) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const off = document.createElement('canvas');
            off.width = width;
            off.height = height;
            const offCtx = off.getContext('2d', { willReadFrequently: true });
            if (!offCtx) return;

            const lines = buildLines(text, width);
            const maxLineWidth = width * 0.9;
            const LINE_HEIGHT = 1.25;

            // Biggest size each line can have: fits the width AND the shared height
            const perLineMax = (height * 0.9) / (lines.length * LINE_HEIGHT);
            const sizes = lines.map((line) => {
                let size = perLineMax;
                offCtx.font = `${FONT_WEIGHT} ${size}px ${fontFamily}`;
                const w = measureSpaced(offCtx, line, size * 0.08);
                if (w > maxLineWidth) size *= maxLineWidth / w;
                return Math.max(12, size);
            });

            // Pixel grid sized from the smallest line, so every letter gets enough rows
            const smallest = Math.min(...sizes);
            const step = clamp(Math.floor((smallest * 0.72) / ROWS_PER_LETTER), 2, 9);
            const pixelSize = Math.max(1.5, step * 0.8);

            // Draw each line centred, track its vertical band for colouring
            const totalHeight = sizes.reduce((h, s) => h + s * LINE_HEIGHT, 0);
            let y = (height - totalHeight) / 2;
            const bands: { top: number; bottom: number }[] = [];

            offCtx.clearRect(0, 0, width, height);
            offCtx.fillStyle = '#fff';
            offCtx.textBaseline = 'middle';
            offCtx.textAlign = 'left';

            lines.forEach((line, i) => {
                const size = sizes[i];
                const spacing = size * 0.08;
                offCtx.font = `${FONT_WEIGHT} ${size}px ${fontFamily}`;
                const lineW = measureSpaced(offCtx, line, spacing);
                const box = size * LINE_HEIGHT;
                fillSpaced(offCtx, line, (width - lineW) / 2, y + box / 2, spacing);
                bands.push({ top: y, bottom: y + box });
                y += box;
            });

            const data = offCtx.getImageData(0, 0, width, height).data;
            const targets: { x: number; y: number; line: number }[] = [];

            for (let py = 0; py < height; py += step) {
                for (let px = 0; px < width; px += step) {
                    if (data[(py * width + px) * 4 + 3] > 110) {
                        const line = Math.max(0, bands.findIndex((b) => py >= b.top && py < b.bottom));
                        targets.push({ x: px, y: py, line });
                    }
                }
            }

            if (!targets.length) {
                pixels = [];
                return;
            }

            // reduce instead of Math.min(...arr): safe for very large pixel counts
            minX = Infinity;
            maxX = -Infinity;
            minY = Infinity;
            maxY = -Infinity;
            for (const t of targets) {
                if (t.x < minX) minX = t.x;
                if (t.x > maxX) maxX = t.x;
                if (t.y < minY) minY = t.y;
                if (t.y > maxY) maxY = t.y;
            }
            const span = Math.max(1, maxX - minX);
            const multiLine = lines.length > 1;

            pixels = targets.map((t, index) => {
                const seed = ((index * 9301 + 49297) % 233280) / 233280;
                const normX = (t.x - minX) / span;
                return {
                    x: t.x,
                    y: t.y,
                    size: pixelSize,
                    // First line ("AMZ") green like the logo, the rest white
                    color: multiLine && t.line === 0 ? highlightColor : color,
                    delay: reducedMotion ? 0 : normX * SWEEP_DURATION + t.line * 90 + seed * 45,
                };
            });

            if (reducedMotion) {
                ctx.clearRect(0, 0, width, height);
                pixels.forEach((p) => drawPixel(p, 1, 1));
                return;
            }

            startTime = performance.now();
            if (animationFrame === null) animationFrame = window.requestAnimationFrame(render);
        };

        // Wait for web fonts so the letters are drawn in the real font, not a fallback
        const fontsReady = document.fonts?.ready ?? Promise.resolve();
        let resizeObserver: ResizeObserver | null = null;

        fontsReady.then(() => {
            if (disposed) return;
            sampleText();
            resizeObserver = new ResizeObserver(sampleText);
            resizeObserver.observe(container);
        });

        return () => {
            disposed = true;
            resizeObserver?.disconnect();
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
        };
    }, [text, color, highlightColor, fontFamily, hidden]);

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
            <span className="preloader__sr">{text.replace(/\|/g, ' ')} — loading</span>
        </div>
    );
}