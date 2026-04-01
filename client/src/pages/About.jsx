import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiUsers, FiAward } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';

const team = [
    { name: 'Arjun Mehta', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
    { name: 'Sneha Patel', role: 'Director of Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
    { name: 'Vikram Singh', role: 'Head of Programs', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
    { name: 'Kavita Rao', role: 'Community Manager', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
];

const timeline = [
    { year: '2015', title: 'Foundation Established', desc: 'HumanityHub was founded with a mission to serve the underserved.' },
    { year: '2017', title: 'First 1000 Lives Impacted', desc: 'Expanded to 5 states with education and healthcare programs.' },
    { year: '2019', title: 'International Recognition', desc: 'Received awards for community development and transparency.' },
    { year: '2021', title: 'Pandemic Response', desc: 'Distributed relief to over 10,000 families during COVID-19.' },
    { year: '2023', title: '50+ Communities Reached', desc: 'Expanded programs to cover environment, women empowerment, and child welfare.' },
];

const values = [
    { icon: <FiTarget size={28} />, title: 'Mission', desc: 'To uplift communities through sustainable education, healthcare, and livelihood programs that create lasting change.' },
    { icon: <FiEye size={28} />, title: 'Vision', desc: 'A world where every individual has equal access to opportunities and lives with dignity, purpose, and hope.' },
    { icon: <FiUsers size={28} />, title: 'Values', desc: 'Compassion, transparency, inclusivity, sustainability, and empowerment guide everything we do.' },
    { icon: <FiAward size={28} />, title: 'Commitment', desc: 'We are committed to accountability, impact measurement, and continuous improvement in all our initiatives.' },
];

export default function About() {
    return (
        <div className="about-page">
            {/* Hero Banner */}
            <section className="page-hero">
                <div className="page-hero__overlay"></div>
                <motion.div
                    className="page-hero__content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>About HumanityHub Foundation</h1>
                    <p>Discover the story, people, and values behind our mission to transform lives.</p>
                </motion.div>
            </section>

            {/* Vision / Mission */}
            <section className="section">
                <div className="container">
                    <SectionTitle subtitle="What Drives Us" title="Our Core Values" />
                    <div className="values__grid">
                        {values.map((v, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <motion.div className="value-card" whileHover={{ y: -5 }}>
                                    <div className="value-card__icon">{v.icon}</div>
                                    <h3>{v.title}</h3>
                                    <p>{v.desc}</p>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story / Background */}
            <section className="section section--alt">
                <div className="container">
                    <SectionTitle subtitle="Our Journey" title="The HumanityHub Story" />
                    <div className="story-content">
                        <ScrollReveal direction="left">
                            <div className="story-content__text">
                                <p>Founded in 2015 by Arjun Mehta, HumanityHub Foundation began as a small community initiative in rural India. What started as weekend teaching sessions for underprivileged children has grown into a full-fledged non-profit organization impacting over 15,000 lives across 50+ communities.</p>
                                <p>Our journey has been fueled by the unwavering belief that change begins at the grassroots level. Through strategic partnerships, dedicated volunteers, and transparent operations, we have built programs that not only address immediate needs but also create sustainable pathways for community growth.</p>
                                <p>Today, HumanityHub operates across education, healthcare, environmental conservation, women empowerment, and disaster relief sectors, with a team of 250+ volunteers and partners nationwide.</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section">
                <div className="container">
                    <SectionTitle subtitle="Milestones" title="Our Journey Through The Years" />
                    <div className="timeline">
                        {timeline.map((item, i) => (
                            <ScrollReveal key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.1}>
                                <div className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}>
                                    <div className="timeline__card">
                                        <span className="timeline__year">{item.year}</span>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section section--alt">
                <div className="container">
                    <SectionTitle subtitle="Our People" title="Meet The Team" description="The passionate individuals behind HumanityHub who work tirelessly to create positive change." />
                    <div className="team__grid">
                        {team.map((member, i) => (
                            <ScrollReveal key={i} delay={i * 0.1} direction="scale">
                                <motion.div className="team-card" whileHover={{ y: -10 }}>
                                    <div className="team-card__image">
                                        <img src={member.image} alt={member.name} />
                                    </div>
                                    <h3 className="team-card__name">{member.name}</h3>
                                    <p className="team-card__role">{member.role}</p>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
