import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiMail, FiBriefcase, FiImage, FiFileText, FiDollarSign, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import * as api from '../utils/api';

const tabs = [
    { key: 'overview', label: 'Overview', icon: <FiBriefcase /> },
    { key: 'volunteers', label: 'Volunteers', icon: <FiUsers /> },
    { key: 'contacts', label: 'Messages', icon: <FiMail /> },
    { key: 'projects', label: 'Projects', icon: <FiBriefcase /> },
    { key: 'gallery', label: 'Gallery', icon: <FiImage /> },
    { key: 'blogs', label: 'Blogs', icon: <FiFileText /> },
    { key: 'donations', label: 'Donations', icon: <FiDollarSign /> },
];

export default function AdminDashboard() {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    useEffect(() => { if (!user || !isAdmin) navigate('/admin/login'); }, [user, isAdmin, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (activeTab === 'overview') { const { data: s } = await api.getDashboardStats(); setStats(s); }
                else if (activeTab === 'volunteers') { const { data: d } = await api.getVolunteers(); setData(d); }
                else if (activeTab === 'contacts') { const { data: d } = await api.getContacts(); setData(d); }
                else if (activeTab === 'projects') { const { data: d } = await api.getProjects(); setData(d); }
                else if (activeTab === 'gallery') { const { data: d } = await api.getGalleryItems(); setData(d); }
                else if (activeTab === 'blogs') { const { data: d } = await api.getBlogs(); setData(d); }
                else if (activeTab === 'donations') { const { data: d } = await api.getDonations(); setData(d); }
            } catch { setToast({ message: 'Failed to fetch data', type: 'error' }); }
            finally { setLoading(false); }
        };
        fetchData();
    }, [activeTab]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const deleteFn = { volunteers: api.deleteVolunteer, contacts: api.deleteContact, projects: api.deleteProject, gallery: api.deleteGalleryItem, blogs: api.deleteBlog };
            await deleteFn[activeTab](id);
            setData(data.filter(i => i._id !== id));
            setToast({ message: 'Deleted successfully', type: 'success' });
        } catch { setToast({ message: 'Delete failed', type: 'error' }); }
    };

    const statCards = [
        { label: 'Volunteers', value: stats.volunteers || 0, icon: <FiUsers />, color: '#0D7377' },
        { label: 'Messages', value: stats.contacts || 0, icon: <FiMail />, color: '#E8590C' },
        { label: 'Projects', value: stats.projects || 0, icon: <FiBriefcase />, color: '#7C3AED' },
        { label: 'Gallery', value: stats.galleryItems || 0, icon: <FiImage />, color: '#059669' },
        { label: 'Blog Posts', value: stats.blogs || 0, icon: <FiFileText />, color: '#D97706' },
        { label: 'Donations (₹)', value: stats.totalDonations || 0, icon: <FiDollarSign />, color: '#DC2626' },
    ];

    return (
        <div className="admin-page">
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}
            <div className="admin-sidebar">
                <div className="admin-sidebar__header">
                    <span>🌿</span><h3>Admin Panel</h3>
                </div>
                {tabs.map(t => (
                    <button key={t.key} className={`admin-tab ${activeTab === t.key ? 'admin-tab--active' : ''}`} onClick={() => setActiveTab(t.key)}>
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>
            <div className="admin-main">
                <div className="admin-header">
                    <h2>{tabs.find(t => t.key === activeTab)?.label}</h2>
                    <span>Welcome, {user?.name}</span>
                </div>
                {loading ? <Loader /> : (
                    <>
                        {activeTab === 'overview' && (
                            <div className="admin-stats">
                                {statCards.map((s, i) => (
                                    <motion.div key={i} className="admin-stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} style={{ borderLeftColor: s.color }}>
                                        <div className="admin-stat-card__icon" style={{ color: s.color }}>{s.icon}</div>
                                        <div><h3>{typeof s.value === 'number' ? s.value.toLocaleString() : s.value}</h3><p>{s.label}</p></div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                        {activeTab !== 'overview' && (
                            <div className="admin-table-wrapper">
                                {data.length === 0 ? <div className="empty-state"><h3>No data yet</h3></div> : (
                                    <table className="admin-table">
                                        <thead><tr>
                                            {activeTab === 'volunteers' && <><th>Name</th><th>Email</th><th>Phone</th><th>Interest</th><th>Status</th><th>Actions</th></>}
                                            {activeTab === 'contacts' && <><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Actions</th></>}
                                            {activeTab === 'projects' && <><th>Title</th><th>Category</th><th>Status</th><th>Impact</th><th>Actions</th></>}
                                            {activeTab === 'gallery' && <><th>Title</th><th>Category</th><th>Image</th><th>Actions</th></>}
                                            {activeTab === 'blogs' && <><th>Title</th><th>Author</th><th>Date</th><th>Actions</th></>}
                                            {activeTab === 'donations' && <><th>Name</th><th>Email</th><th>Amount</th><th>Status</th><th>Date</th></>}
                                        </tr></thead>
                                        <tbody>
                                            {data.map(item => (
                                                <tr key={item._id}>
                                                    {activeTab === 'volunteers' && <><td>{item.name}</td><td>{item.email}</td><td>{item.phone}</td><td>{item.interestArea}</td><td><span className={`badge badge--${item.status}`}>{item.status}</span></td><td><button className="icon-btn icon-btn--danger" onClick={() => handleDelete(item._id)}><FiTrash2 /></button></td></>}
                                                    {activeTab === 'contacts' && <><td>{item.name}</td><td>{item.email}</td><td>{item.subject}</td><td className="truncate">{item.message}</td><td><button className="icon-btn icon-btn--danger" onClick={() => handleDelete(item._id)}><FiTrash2 /></button></td></>}
                                                    {activeTab === 'projects' && <><td>{item.title}</td><td>{item.category}</td><td><span className={`badge badge--${item.status}`}>{item.status}</span></td><td>{item.impact}</td><td><button className="icon-btn icon-btn--danger" onClick={() => handleDelete(item._id)}><FiTrash2 /></button></td></>}
                                                    {activeTab === 'gallery' && <><td>{item.title}</td><td>{item.category}</td><td><img src={item.image} alt="" style={{ width: 50, height: 35, objectFit: 'cover', borderRadius: 4 }} /></td><td><button className="icon-btn icon-btn--danger" onClick={() => handleDelete(item._id)}><FiTrash2 /></button></td></>}
                                                    {activeTab === 'blogs' && <><td>{item.title}</td><td>{item.author}</td><td>{new Date(item.createdAt).toLocaleDateString()}</td><td><button className="icon-btn icon-btn--danger" onClick={() => handleDelete(item._id)}><FiTrash2 /></button></td></>}
                                                    {activeTab === 'donations' && <><td>{item.name}</td><td>{item.email}</td><td>₹{item.amount?.toLocaleString()}</td><td><span className={`badge badge--${item.status}`}>{item.status}</span></td><td>{new Date(item.createdAt).toLocaleDateString()}</td></>}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
