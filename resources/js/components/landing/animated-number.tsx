import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type AnimatedNumberProps = {
    value: number;
    format?: (n: number) => string;
};

/** Counts smoothly from the previous value to the new one. */
export default function AnimatedNumber({
    value,
    format = (n) => Math.round(n).toLocaleString('en-PH'),
}: AnimatedNumberProps) {
    const reduced = useReducedMotion();
    const [display, setDisplay] = useState(value);
    const from = useRef(value);

    useEffect(() => {
        if (reduced) {
            from.current = value;
            setDisplay(value);

            return;
        }

        const start = performance.now();
        const origin = from.current;
        const duration = 700;
        let frame = 0;

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const next = origin + (value - origin) * eased;

            from.current = next;
            setDisplay(next);

            if (t < 1) {
                frame = requestAnimationFrame(tick);
            }
        };

        frame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frame);
    }, [value, reduced]);

    return <span className="tabular-nums">{format(display)}</span>;
}
