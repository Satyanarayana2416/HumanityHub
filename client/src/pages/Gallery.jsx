import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import Loader from '../components/Loader';
import { getGalleryItems } from '../utils/api';

const categories = ['All', 'Events', 'Volunteers', 'Projects', 'Community', 'Campaigns', 'Celebrations'];

const fallbackGallery = [
    { _id: '1', title: 'Community Health Camp', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop', category: 'Events' },
    { _id: '2', title: 'Tree Plantation Drive', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop', category: 'Campaigns' },
    { _id: '3', title: 'Volunteer Training', image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop', category: 'Volunteers' },
    { _id: '4', title: 'School Opening Ceremony', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop', category: 'Projects' },
    { _id: '5', title: 'Diwali Celebration', image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&h=400&fit=crop', category: 'Celebrations' },
    { _id: '6', title: 'Emergency Relief', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop', category: 'Community' },
    { _id: '7', title: 'Art Workshop for Kids', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop', category: 'Events' },
    { _id: '8', title: 'Women Empowerment Meet', image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop', category: 'Community' },
    { _id: '9', title: 'Annual Day Celebration', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop', category: 'Celebrations' },
];

export default function Gallery() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await getGalleryItems();
                setItems(data.length > 0 ? data : fallbackGallery);
            } catch {
                setItems(fallbackGallery);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);
    const currentIndex = lightbox ? filtered.findIndex(i => i._id === lightbox._id) : -1;

    const navigate = (dir) => {
        const newIndex = currentIndex + dir;
        if (newIndex >= 0 && newIndex < filtered.length) {
            setLightbox(filtered[newIndex]);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="gallery-page">
            <section className="page-hero page-hero--gallery">
                <div className="page-hero__overlay"></div>
                <motion.div className="page-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1>Photo Gallery</h1>
                    <p>Glimpses of our journey, events, and the impact we've created together.</p>
                </motion.div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionTitle subtitle="Our Moments" title="Captured Memories" />

                    <div className="filter-tabs">
                        {categories.map(cat => (
                            <button key={cat} className={`filter-tab ${activeCategory === cat ? 'filter-tab--active' : ''}`} onClick={() => setActiveCategory(cat)}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    <motion.div className="gallery__grid" layout>
                        <AnimatePresence mode="popLayout">
                            {filtered.map((item) => (
                                <motion.div
                                    key={item._id}
                                    className="gallery__item"
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ scale: 1.03 }}
                                    onClick={() => setLightbox(item)}
                                >
                                    <img src={item.image} alt={item.title} />
                                    <div className="gallery__item-overlay">
                                        <h4>{item.title}</h4>
                                        <span>{item.category}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            className="lightbox__content"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="lightbox__close" onClick={() => setLightbox(null)}><FiX size={24} /></button>
                            {currentIndex > 0 && <button className="lightbox__nav lightbox__nav--prev" onClick={() => navigate(-1)}><FiChevronLeft size={32} /></button>}
                            {currentIndex < filtered.length - 1 && <button className="lightbox__nav lightbox__nav--next" onClick={() => navigate(1)}><FiChevronRight size={32} /></button>}
                            <img src={lightbox.image} alt={lightbox.title} />
                            <div className="lightbox__info">
                                <h3>{lightbox.title}</h3>
                                <span>{lightbox.category}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
