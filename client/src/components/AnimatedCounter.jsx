import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function AnimatedCounter({ end, suffix = '', prefix = '', label, icon }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <div className="counter-card" ref={ref}>
            {icon && <div className="counter-card__icon">{icon}</div>}
            <div className="counter-card__number">
                {prefix}
                {inView ? <CountUp end={end} duration={2.5} separator="," /> : '0'}
                {suffix}
            </div>
            <div className="counter-card__label">{label}</div>
        </div>
    );
}
