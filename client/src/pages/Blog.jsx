import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiTag } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import Loader from '../components/Loader';
import { getBlogs } from '../utils/api';

const fallbackBlogs = [
    { _id: '1', title: 'How Education Transforms Rural Communities', excerpt: 'Discover the ripple effect of quality education in underserved areas.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop', author: 'Arjun Mehta', tags: ['Education'], createdAt: '2024-01-15' },
    { _id: '2', title: 'Clean Water: A Right, Not a Privilege', excerpt: 'Our clean water initiative has reached 10 villages.', image: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=500&h=300&fit=crop', author: 'Sneha Patel', tags: ['Environment'], createdAt: '2024-02-10' },
    { _id: '3', title: 'Volunteer Spotlight: Stories That Inspire', excerpt: 'Meet the incredible volunteers who bring hope to communities.', image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop', author: 'Kavita Rao', tags: ['Volunteers'], createdAt: '2024-03-05' },
];

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await getBlogs();
                setBlogs(data.length > 0 ? data : fallbackBlogs);
            } catch { setBlogs(fallbackBlogs); }
            finally { setLoading(false); }
        };
        fetch();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="blog-page">
            <section className="page-hero page-hero--blog">
                <div className="page-hero__overlay"></div>
                <motion.div className="page-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                    <h1>Our Blog & News</h1>
                    <p>Stories of impact and insights on social change.</p>
                </motion.div>
            </section>
            <section className="section">
                <div className="container">
                    <SectionTitle subtitle="Latest Updates" title="News & Stories" />
                    <div className="blog__grid">
                        {blogs.map((blog, i) => (
                            <ScrollReveal key={blog._id} delay={i * 0.1}>
                                <motion.article className="blog-card" whileHover={{ y: -8 }}>
                                    <div className="blog-card__image"><img src={blog.image} alt={blog.title} /></div>
                                    <div className="blog-card__content">
                                        <div className="blog-card__meta">
                                            <span><FiCalendar /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                            <span><FiUser /> {blog.author}</span>
                                        </div>
                                        <h3>{blog.title}</h3>
                                        <p>{blog.excerpt}</p>
                                        <div className="blog-card__tags">
                                            {blog.tags?.map((tag, j) => (<span key={j} className="blog-card__tag"><FiTag /> {tag}</span>))}
                                        </div>
                                        <button className="btn btn--text">Read More →</button>
                                    </div>
                                </motion.article>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
