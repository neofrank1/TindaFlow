import { useEffect, useRef, useState } from 'react';
import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealProps = {
    children: ReactNode;
    /** Delay in ms, used to stagger siblings. */
    delay?: number;
    className?: string;
    as?: ElementType;
};

/** Fades and slides its children in the first time they scroll into view. */
export default function Reveal({
    children,
    delay = 0,
    className,
    as: Tag = 'div',
}: RevealProps) {
    const ref = useRef<HTMLElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;

        if (!el) {
            return;
        }

        if (typeof IntersectionObserver === 'undefined') {
            setShown(true);

            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            style={{ transitionDelay: shown ? `${delay}ms` : undefined }}
            className={cn(
                'transition-all duration-700 ease-out motion-reduce:transition-none',
                shown
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
                className,
            )}
        >
            {children}
        </Tag>
    );
}
