import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { submitContact } from '../utils/api';
import Toast from '../components/Toast';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';

const contactInfo = [
    { icon: <FiMapPin size={24} />, title: 'Our Address', text: '123 Hope Street, Connaught Place, New Delhi, India - 110001' },
    { icon: <FiPhone size={24} />, title: 'Phone Number', text: '+91 98765 43210' },
    { icon: <FiMail size={24} />, title: 'Email Address', text: 'contact@humanityhub.org' },
    { icon: <FiClock size={24} />, title: 'Working Hours', text: 'Mon - Sat: 9:00 AM - 6:00 PM' },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
        if (!form.subject.trim()) errs.subject = 'Subject is required';
        if (!form.message.trim()) errs.message = 'Message is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await submitContact(form);
            setToast({ message: 'Thank you! Your message has been sent successfully.', type: 'success' });
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setToast({ message: err.response?.data?.message || 'Failed to send message. Please try again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    return (
        <div className="contact-page">
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}

            <section className="page-hero page-hero--contact">
                <div className="page-hero__overlay"></div>
                <motion.div className="page-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1>Get In Touch</h1>
                    <p>Have questions or want to collaborate? We'd love to hear from you.</p>
                </motion.div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="contact-layout">
                        <ScrollReveal direction="left">
                            <div className="contact-info-section">
                                <SectionTitle subtitle="Reach Out" title="Contact Information" />
                                <div className="contact-info__cards">
                                    {contactInfo.map((info, i) => (
                                        <motion.div key={i} className="contact-info-card" whileHover={{ x: 5 }}>
                                            <div className="contact-info-card__icon">{info.icon}</div>
                                            <div>
                                                <h4>{info.title}</h4>
                                                <p>{info.text}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="contact-socials">
                                    <h4>Follow Us</h4>
                                    <div className="contact-socials__links">
                                        {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                                            <motion.a key={i} href="#" className="contact-social-link" whileHover={{ scale: 1.2, y: -3 }}>
                                                <Icon />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="right">
                            <form className="form-card" onSubmit={handleSubmit}>
                                <SectionTitle subtitle="Send Message" title="Write To Us" />

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={errors.name ? 'input--error' : ''} />
                                        {errors.name && <span className="form-error">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address *</label>
                                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={errors.email ? 'input--error' : ''} />
                                        {errors.email && <span className="form-error">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Subject *</label>
                                    <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Message subject" className={errors.subject ? 'input--error' : ''} />
                                    {errors.subject && <span className="form-error">{errors.subject}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Message *</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." rows={5} className={errors.message ? 'input--error' : ''}></textarea>
                                    {errors.message && <span className="form-error">{errors.message}</span>}
                                </div>

                                <motion.button type="submit" className="btn btn--primary btn--full" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </motion.button>
                            </form>
                        </ScrollReveal>
                    </div>

                    {/* Map */}
                    <ScrollReveal>
                        <div className="contact-map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6743466567097!2d77.21665031508246!3d28.632732082420463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
                                width="100%"
                                height="400"
                                style={{ border: 0, borderRadius: '16px' }}
                                allowFullScreen
                                loading="lazy"
                                title="HumanityHub Location"
                            ></iframe>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
