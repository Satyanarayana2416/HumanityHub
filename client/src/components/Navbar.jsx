import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/works', label: 'Our Works' },
    { path: '/volunteer', label: 'Volunteer' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Blog' },
    { path: '/donate', label: 'Donate' },
    { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { user, isAdmin, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => setIsOpen(false), [location]);

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="navbar__container">
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-icon">🌿</span>
                    <span className="navbar__logo-text">HopeRise</span>
                </Link>

                <div className="navbar__links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isAdmin && (
                        <Link to="/admin" className="navbar__link navbar__link--admin">
                            Dashboard
                        </Link>
                    )}
                    {user ? (
                        <button onClick={logout} className="navbar__btn navbar__btn--outline">
                            Logout
                        </button>
                    ) : (
                        <Link to="/admin/login" className="navbar__btn navbar__btn--primary">
                            Admin
                        </Link>
                    )}
                </div>

                <button className="navbar__hamburger" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="navbar__mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`navbar__mobile-link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {isAdmin && (
                            <Link to="/admin" className="navbar__mobile-link">Dashboard</Link>
                        )}
                        {user ? (
                            <button onClick={logout} className="navbar__btn navbar__btn--outline" style={{ margin: '0.5rem 1rem' }}>
                                Logout
                            </button>
                        ) : (
                            <Link to="/admin/login" className="navbar__btn navbar__btn--primary" style={{ margin: '0.5rem 1rem', display: 'inline-block' }}>
                                Admin
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
