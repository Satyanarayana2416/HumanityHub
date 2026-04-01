import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { submitDonation } from '../utils/api';
import Toast from '../components/Toast';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';

const presets = [500, 1000, 2500, 5000, 10000];

export default function Donate() {
    const [form, setForm] = useState({ name: '', email: '', amount: '', message: '', paymentMethod: 'card' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Required';
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
        if (!form.amount || form.amount < 1) e.amount = 'Amount required';
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await submitDonation({ ...form, amount: Number(form.amount), status: 'completed' });
            setToast({ message: 'Thank you for your generous donation!', type: 'success' });
            setForm({ name: '', email: '', amount: '', message: '', paymentMethod: 'card' });
        } catch (err) {
            setToast({ message: err.response?.data?.message || 'Failed. Please try again.', type: 'error' });
        } finally { setLoading(false); }
    };

    return (
        <div className="donate-page">
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}
            <section className="page-hero page-hero--donate">
                <div className="page-hero__overlay"></div>
                <motion.div className="page-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                    <h1>Support Our Cause</h1>
                    <p>Your donation helps us bring hope, education, and healthcare to thousands.</p>
                </motion.div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="donate-layout">
                        <ScrollReveal direction="left">
                            <div className="donate-info">
                                <h2><FaHeart style={{ color: '#ff6b6b' }} /> Why Donate?</h2>
                                <p>Every rupee you contribute goes directly towards our programs. We maintain full transparency and publish annual impact reports.</p>
                                <div className="donate-impact">
                                    <div className="donate-impact__item"><strong>₹500</strong><span>Feeds a child for a month</span></div>
                                    <div className="donate-impact__item"><strong>₹1,000</strong><span>School supplies for 5 children</span></div>
                                    <div className="donate-impact__item"><strong>₹5,000</strong><span>Clean water for a family for a year</span></div>
                                    <div className="donate-impact__item"><strong>₹10,000</strong><span>Sponsors a child's education for a year</span></div>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right">
                            <form className="form-card" onSubmit={handleSubmit}>
                                <SectionTitle subtitle="Make a Difference" title="Donate Now" />
                                <div className="form-group"><label>Full Name *</label><input name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={errors.name ? 'input--error' : ''} />{errors.name && <span className="form-error">{errors.name}</span>}</div>
                                <div className="form-group"><label>Email *</label><input name="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className={errors.email ? 'input--error' : ''} />{errors.email && <span className="form-error">{errors.email}</span>}</div>
                                <div className="form-group"><label>Amount (₹) *</label>
                                    <div className="amount-presets">{presets.map(a => (<button type="button" key={a} className={`amount-preset ${Number(form.amount) === a ? 'amount-preset--active' : ''}`} onClick={() => setForm({ ...form, amount: a })}>₹{a.toLocaleString()}</button>))}</div>
                                    <input type="number" name="amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="Or enter custom amount" className={errors.amount ? 'input--error' : ''} />{errors.amount && <span className="form-error">{errors.amount}</span>}
                                </div>
                                <div className="form-group"><label>Message (Optional)</label><textarea name="message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3} placeholder="Leave a message..."></textarea></div>
                                <motion.button type="submit" className="btn btn--primary btn--full" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{loading ? 'Processing...' : 'Donate Now ❤️'}</motion.button>
                            </form>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
