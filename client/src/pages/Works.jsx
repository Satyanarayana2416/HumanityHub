import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import Loader from '../components/Loader';
import { getProjects } from '../utils/api';

const categories = ['All', 'Education', 'Healthcare', 'Environment', 'Community', 'Disaster Relief', 'Women Empowerment', 'Child Welfare'];

const fallbackProjects = [
    { _id: '1', title: 'Rural Education Initiative', description: 'Bringing quality education to remote villages through mobile classrooms and trained teachers.', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=300&fit=crop', category: 'Education', impact: '2,500 students enrolled', status: 'ongoing', location: 'Rajasthan, India' },
    { _id: '2', title: 'Clean Water Project', description: 'Installing water purification systems and bore wells in drought-affected communities.', image: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=500&h=300&fit=crop', category: 'Environment', impact: '10 villages covered', status: 'completed', location: 'Maharashtra, India' },
    { _id: '3', title: 'Women Skill Training', description: 'Empowering women with vocational training, financial literacy, and entrepreneurship support.', image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=500&h=300&fit=crop', category: 'Women Empowerment', impact: '500 women trained', status: 'ongoing', location: 'Uttar Pradesh, India' },
    { _id: '4', title: 'Community Health Camps', description: 'Free health check-ups, vaccinations, and awareness programs for underserved populations.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop', category: 'Healthcare', impact: '8,000 patients treated', status: 'ongoing', location: 'Bihar, India' },
    { _id: '5', title: 'Disaster Relief Program', description: 'Providing immediate relief supplies, shelter, and rehabilitation support during natural disasters.', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&h=300&fit=crop', category: 'Disaster Relief', impact: '3,000 families helped', status: 'completed', location: 'Kerala, India' },
    { _id: '6', title: 'Child Nutrition Program', description: 'Ensuring proper nutrition for children through midday meal programs and nutritional supplements.', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=300&fit=crop', category: 'Child Welfare', impact: '1,200 children fed daily', status: 'ongoing', location: 'Madhya Pradesh, India' },
];

export default function Works() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await getProjects();
                setProjects(data.length > 0 ? data : fallbackProjects);
            } catch {
                setProjects(fallbackProjects);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filtered = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    if (loading) return <Loader />;

    return (
        <div className="works-page">
            <section className="page-hero page-hero--works">
                <div className="page-hero__overlay"></div>
                <motion.div className="page-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1>Our Works & Projects</h1>
                    <p>Discover the initiatives that are transforming communities and creating lasting impact.</p>
                </motion.div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionTitle subtitle="What We Do" title="Projects & Initiatives" />

                    <div className="filter-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-tab ${activeCategory === cat ? 'filter-tab--active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <motion.div className="projects__grid" layout>
                        <AnimatePresence mode="popLayout">
                            {filtered.map((project) => (
                                <motion.div
                                    key={project._id}
                                    className="project-card"
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="project-card__image">
                                        <img src={project.image} alt={project.title} />
                                        <span className={`project-card__status project-card__status--${project.status}`}>
                                            {project.status}
                                        </span>
                                        <span className="project-card__category">{project.category}</span>
                                    </div>
                                    <div className="project-card__content">
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                        {project.impact && (
                                            <div className="project-card__impact">
                                                📊 Impact: <strong>{project.impact}</strong>
                                            </div>
                                        )}
                                        {project.location && (
                                            <div className="project-card__location">📍 {project.location}</div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filtered.length === 0 && (
                        <div className="empty-state">
                            <h3>No projects found</h3>
                            <p>No projects in this category yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
