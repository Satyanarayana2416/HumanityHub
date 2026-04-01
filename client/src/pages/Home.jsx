import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHandsHelping, FaGlobeAmericas, FaUsers, FaDonate, FaArrowRight } from 'react-icons/fa';
import { FiHeart, FiBookOpen, FiShield, FiSun } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import AnimatedCounter from '../components/AnimatedCounter';

const impactData = [
    { end: 15000, suffix: '+', label: 'Lives Impacted', icon: <FaGlobeAmericas /> },
    { end: 250, suffix: '+', label: 'Volunteers', icon: <FaUsers /> },
    { end: 85, suffix: '+', label: 'Projects Done', icon: <FaHandsHelping /> },
    { end: 50, suffix: '+', label: 'Communities', icon: <FaDonate /> },
];

const features = [
    { icon: <FiHeart size={32} />, title: 'Healthcare', desc: 'Providing free health camps, medical aid, and wellness programs to underserved communities.' },
    { icon: <FiBookOpen size={32} />, title: 'Education', desc: 'Building schools, scholarships, and literacy programs for children in rural areas.' },
    { icon: <FiShield size={32} />, title: 'Protection', desc: 'Ensuring safety and rights of women, children, and marginalized groups.' },
    { icon: <FiSun size={32} />, title: 'Environment', desc: 'Planting trees, clean water initiatives, and sustainable living programs.' },
];

const testimonials = [
    { name: 'Priya Sharma', role: 'Volunteer', text: 'Working with HopeRise has been one of the most fulfilling experiences of my life. The team is incredibly passionate and dedicated.' },
    { name: 'Rajesh Kumar', role: 'Beneficiary', text: 'Thanks to HopeRise, my children now have access to quality education. I am forever grateful for their support and kindness.' },
    { name: 'Dr. Anita Desai', role: 'Partner', text: 'HopeRise is setting the gold standard for NGO work in India. Their transparency and impact are truly commendable.' },
];

export default function Home() {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__overlay"></div>
                <div className="hero__particles">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="hero__particle"
                            animate={{
                                y: [0, -100, 0],
                                x: [0, Math.random() * 50 - 25, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${60 + Math.random() * 40}%`,
                            }}
                        />
                    ))}
                </div>
                <div className="hero__content">
                    <motion.span
                        className="hero__badge"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        🌍 Making a difference since 2015
                    </motion.span>
                    <motion.h1
                        className="hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Empowering <span className="hero__title--accent">Communities</span>,
                        <br />Transforming <span className="hero__title--accent">Lives</span>
                    </motion.h1>
                    <motion.p
                        className="hero__subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Join us in our mission to create sustainable change and build a more equitable world
                        for everyone. Together, we can make the impossible possible.
                    </motion.p>
                    <motion.div
                        className="hero__buttons"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Link to="/donate" className="btn btn--primary btn--lg">
                            Donate Now <FaDonate />
                        </Link>
                        <Link to="/volunteer" className="btn btn--outline-white btn--lg">
                            Become a Volunteer <FaArrowRight />
                        </Link>
                    </motion.div>
                </div>
                <div className="hero__scroll-indicator">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <span>Scroll Down</span>
                        <div className="hero__scroll-line"></div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="section section--mission">
                <div className="container">
                    <SectionTitle
                        subtitle="Our Purpose"
                        title="Creating Lasting Impact"
                        description="We believe that every person deserves a chance to live with dignity. Our programs focus on sustainable solutions that empower communities from within."
                    />
                    <div className="mission__grid">
                        {features.map((f, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <motion.div
                                    className="feature-card"
                                    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(13,115,119,0.15)' }}
                                >
                                    <div className="feature-card__icon">{f.icon}</div>
                                    <h3 className="feature-card__title">{f.title}</h3>
                                    <p className="feature-card__desc">{f.desc}</p>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Counters */}
            <section className="section section--counters">
                <div className="container">
                    <SectionTitle subtitle="Our Impact" title="Numbers That Speak" light />
                    <div className="counters__grid">
                        {impactData.map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.1} direction="scale">
                                <AnimatedCounter {...item} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="section">
                <div className="container">
                    <div className="about-preview">
                        <ScrollReveal direction="left">
                            <div className="about-preview__image">
                                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop" alt="Children learning" />
                                <div className="about-preview__badge">
                                    <span className="about-preview__badge-number">9+</span>
                                    <span>Years of Service</span>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right">
                            <div className="about-preview__content">
                                <span className="section-label">Who We Are</span>
                                <h2>A Community Driven By Compassion And Purpose</h2>
                                <p>HopeRise Foundation was established with a simple yet powerful vision: to create a world where access to education, healthcare, and basic necessities is not a privilege, but a right.</p>
                                <p>Over the years, we have worked tirelessly across multiple communities, building infrastructure, training youth, and providing critical support during times of need.</p>
                                <Link to="/about" className="btn btn--primary">
                                    Learn More About Us <FaArrowRight />
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section section--testimonials">
                <div className="container">
                    <SectionTitle subtitle="What People Say" title="Voices of Change" />
                    <div className="testimonials__grid">
                        {testimonials.map((t, i) => (
                            <ScrollReveal key={i} delay={i * 0.15}>
                                <motion.div className="testimonial-card" whileHover={{ y: -5 }}>
                                    <div className="testimonial-card__quote">"</div>
                                    <p className="testimonial-card__text">{t.text}</p>
                                    <div className="testimonial-card__author">
                                        <div className="testimonial-card__avatar">{t.name[0]}</div>
                                        <div>
                                            <strong>{t.name}</strong>
                                            <span>{t.role}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section section--cta">
                <div className="container">
                    <ScrollReveal direction="scale">
                        <div className="cta-block">
                            <h2>Ready to Make a Difference?</h2>
                            <p>Join thousands of volunteers and donors who are changing lives every day. Your contribution, no matter how small, can create a ripple of positive change.</p>
                            <div className="cta-block__buttons">
                                <Link to="/donate" className="btn btn--primary btn--lg">Donate Now</Link>
                                <Link to="/volunteer" className="btn btn--outline-white btn--lg">Join as Volunteer</Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
