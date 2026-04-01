import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
    { icon: <FaFacebookF />, url: '#', label: 'Facebook' },
    { icon: <FaTwitter />, url: '#', label: 'Twitter' },
    { icon: <FaInstagram />, url: '#', label: 'Instagram' },
    { icon: <FaLinkedinIn />, url: '#', label: 'LinkedIn' },
    { icon: <FaYoutube />, url: '#', label: 'YouTube' },
];

const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/works', label: 'Our Works' },
    { path: '/volunteer', label: 'Volunteer' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact Us' },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__wave">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="var(--color-primary-dark)" />
                </svg>
            </div>

            <div className="footer__content">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <div className="footer__logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                            <img src="/logo.png" alt="HumanityHub Logo" style={{ height: '36px', objectFit: 'contain' }} />
                            <h3 className="footer__logo" style={{ marginBottom: 0 }}>HumanityHub Foundation</h3>
                        </div>
                        <p className="footer__desc">
                            Empowering communities, transforming lives. Together we can create a world where every person has the opportunity to thrive.
                        </p>
                        <div className="footer__socials">
                            {socialLinks.map((s, i) => (
                                <motion.a
                                    key={i}
                                    href={s.url}
                                    className="footer__social-link"
                                    aria-label={s.label}
                                    whileHover={{ scale: 1.2, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {s.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="footer__section">
                        <h4 className="footer__title">Quick Links</h4>
                        <ul className="footer__list">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="footer__link">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer__section">
                        <h4 className="footer__title">Contact Info</h4>
                        <ul className="footer__list">
                            <li className="footer__info">📍 123 Hope Street, New Delhi, India</li>
                            <li className="footer__info">📞 +91 98765 43210</li>
                            <li className="footer__info">✉️ contact@humanityhub.org</li>
                            <li className="footer__info">🕐 Mon - Sat: 9:00 AM - 6:00 PM</li>
                        </ul>
                    </div>

                    <div className="footer__section">
                        <h4 className="footer__title">Newsletter</h4>
                        <p className="footer__newsletter-text">Subscribe to get latest updates and news.</p>
                        <form className="footer__newsletter" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Your email" className="footer__newsletter-input" />
                            <button type="submit" className="footer__newsletter-btn">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© 2024 HumanityHub Foundation. All rights reserved. Made with <FaHeart style={{ color: '#ff6b6b', verticalAlign: 'middle' }} /> for a better world.</p>
                </div>
            </div>
        </footer>
    );
}
