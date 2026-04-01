import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

function useCountUp(end, duration = 2.5, inView) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let startTime = null;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, inView]);

    return count;
}

export default function AnimatedCounter({ end, suffix = '', prefix = '', label, icon }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const count = useCountUp(end, 2.5, inView);

    const formattedCount = count.toLocaleString();

    return (
        <div className="counter-card" ref={ref}>
            {icon && <div className="counter-card__icon">{icon}</div>}
            <div className="counter-card__number">
                {prefix}
                {formattedCount}
                {suffix}
            </div>
            <div className="counter-card__label">{label}</div>
        </div>
    );
}
