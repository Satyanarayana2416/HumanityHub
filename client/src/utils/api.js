import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add auth token to requests
API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('humanityhub_user'));
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

// Auth
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const getProfile = () => API.get('/auth/profile');

// Volunteers
export const submitVolunteer = (data) => API.post('/volunteers', data);
export const getVolunteers = () => API.get('/volunteers');
export const deleteVolunteer = (id) => API.delete(`/volunteers/${id}`);
export const updateVolunteer = (id, data) => API.put(`/volunteers/${id}`, data);

// Contacts
export const submitContact = (data) => API.post('/contacts', data);
export const getContacts = () => API.get('/contacts');
export const deleteContact = (id) => API.delete(`/contacts/${id}`);

// Projects
export const getProjects = (params) => API.get('/projects', { params });
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Gallery
export const getGalleryItems = (params) => API.get('/gallery', { params });
export const createGalleryItem = (data) => API.post('/gallery', data);
export const deleteGalleryItem = (id) => API.delete(`/gallery/${id}`);

// Blogs
export const getBlogs = (params) => API.get('/blogs', { params });
export const getBlog = (id) => API.get(`/blogs/${id}`);
export const createBlog = (data) => API.post('/blogs', data);
export const updateBlog = (id, data) => API.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

// Donations
export const submitDonation = (data) => API.post('/donations', data);
export const getDonations = () => API.get('/donations');

// Stats
export const getDashboardStats = () => API.get('/stats/dashboard');
