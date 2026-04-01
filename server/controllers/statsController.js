const Volunteer = require('../models/Volunteer');
const Contact = require('../models/Contact');
const Project = require('../models/Project');
const Gallery = require('../models/Gallery');
const Blog = require('../models/Blog');
const Donation = require('../models/Donation');

// @desc    Get dashboard stats (Admin)
// @route   GET /api/stats/dashboard
exports.getDashboardStats = async (req, res) => {
    try {
        const [volunteers, contacts, projects, galleryItems, blogs, donations] = await Promise.all([
            Volunteer.countDocuments(),
            Contact.countDocuments(),
            Project.countDocuments(),
            Gallery.countDocuments(),
            Blog.countDocuments(),
            Donation.aggregate([
                { $match: { status: 'completed' } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ])
        ]);

        res.json({
            volunteers,
            contacts,
            projects,
            galleryItems,
            blogs,
            totalDonations: donations.length > 0 ? donations[0].total : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
