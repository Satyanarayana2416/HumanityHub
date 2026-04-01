import ScrollReveal from './ScrollReveal';

export default function SectionTitle({ subtitle, title, description, light = false }) {
    return (
        <ScrollReveal>
            <div className={`section-title ${light ? 'section-title--light' : ''}`}>
                {subtitle && <span className="section-title__subtitle">{subtitle}</span>}
                <h2 className="section-title__heading">{title}</h2>
                {description && <p className="section-title__desc">{description}</p>}
                <div className="section-title__divider">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </ScrollReveal>
    );
}
