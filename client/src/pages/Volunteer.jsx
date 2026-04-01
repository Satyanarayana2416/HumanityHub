import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitVolunteer } from '../utils/api';
import Toast from '../components/Toast';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';

const interestAreas = ['Education', 'Healthcare', 'Environment', 'Community Development', 'Disaster Relief', 'Women Empowerment', 'Child Welfare', 'Other'];

export default function Volunteer() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', interestArea: '', message: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
        if (!form.phone.trim()) errs.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) errs.phone = 'Invalid phone number';
        if (!form.address.trim()) errs.address = 'Address is required';
        if (!form.interestArea) errs.interestArea = 'Please select an interest area';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await submitVolunteer(form);
            setToast({ message: 'Thank you for registering as a volunteer! We will contact you soon.', type: 'success' });
            setForm({ name: '', email: '', phone: '', address: '', interestArea: '', message: '' });
        } catch (err) {
            setToast({ message: err.response?.data?.message || 'Something went wrong. Please try again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    return (
        <div className="volunteer-page">
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}

            <section className="page-hero page-hero--volunteer">
                <div className="page-hero__overlay"></div>
                <motion.div className="page-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1>Become a Volunteer</h1>
                    <p>Lend your time and skills to create meaningful change in communities that need it most.</p>
                </motion.div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="volunteer-layout">
                        <ScrollReveal direction="left">
                            <div className="volunteer-info">
                                <h2>Why Volunteer With Us?</h2>
                                <div className="volunteer-info__list">
                                    <div className="volunteer-info__item">
                                        <span className="volunteer-info__icon">🤝</span>
                                        <div>
                                            <h4>Make Real Impact</h4>
                                            <p>Work directly with communities and see the tangible results of your efforts.</p>
                                        </div>
                                    </div>
                                    <div className="volunteer-info__item">
                                        <span className="volunteer-info__icon">📚</span>
                                        <div>
                                            <h4>Learn & Grow</h4>
                                            <p>Gain valuable experience, skills, and perspectives through hands-on involvement.</p>
                                        </div>
                                    </div>
                                    <div className="volunteer-info__item">
                                        <span className="volunteer-info__icon">🌟</span>
                                        <div>
                                            <h4>Join a Community</h4>
                                            <p>Connect with like-minded individuals who share your passion for social good.</p>
                                        </div>
                                    </div>
                                    <div className="volunteer-info__item">
                                        <span className="volunteer-info__icon">📜</span>
                                        <div>
                                            <h4>Get Certified</h4>
                                            <p>Receive certificates and recognition for your valuable contributions.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="right">
                            <form className="form-card" onSubmit={handleSubmit}>
                                <SectionTitle subtitle="Register Now" title="Volunteer Application" />

                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" className={errors.name ? 'input--error' : ''} />
                                    {errors.name && <span className="form-error">{errors.name}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email Address *</label>
                                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={errors.email ? 'input--error' : ''} />
                                        {errors.email && <span className="form-error">{errors.email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number *</label>
                                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" className={errors.phone ? 'input--error' : ''} />
                                        {errors.phone && <span className="form-error">{errors.phone}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Address *</label>
                                    <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Your complete address" className={errors.address ? 'input--error' : ''} />
                                    {errors.address && <span className="form-error">{errors.address}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Interest Area *</label>
                                    <select name="interestArea" value={form.interestArea} onChange={handleChange} className={errors.interestArea ? 'input--error' : ''}>
                                        <option value="">Select your interest</option>
                                        {interestAreas.map(area => (
                                            <option key={area} value={area}>{area}</option>
                                        ))}
                                    </select>
                                    {errors.interestArea && <span className="form-error">{errors.interestArea}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Message (Optional)</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about yourself and why you want to volunteer..." rows={4}></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="btn btn--primary btn--full"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {loading ? 'Submitting...' : 'Register as Volunteer'}
                                </motion.button>
                            </form>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
