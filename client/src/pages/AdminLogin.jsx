import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

export default function AdminLogin() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) { setToast({ message: 'Please fill all fields', type: 'error' }); return; }
        setLoading(true);
        try {
            const { data } = await loginUser(form);
            if (data.role !== 'admin') { setToast({ message: 'Access denied. Admin only.', type: 'error' }); setLoading(false); return; }
            login(data);
            navigate('/admin');
        } catch (err) {
            setToast({ message: err.response?.data?.message || 'Login failed', type: 'error' });
        } finally { setLoading(false); }
    };

    return (
        <div className="admin-login-page">
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}
            <motion.div className="admin-login-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <div className="admin-login-card__header">
                    <span className="admin-login-card__icon">🔐</span>
                    <h2>Admin Login</h2>
                    <p>Access the admin dashboard</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="admin@hoperise.org" /></div>
                    <div className="form-group"><label>Password</label><input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Enter password" /></div>
                    <motion.button type="submit" className="btn btn--primary btn--full" disabled={loading} whileHover={{ scale: 1.02 }}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
