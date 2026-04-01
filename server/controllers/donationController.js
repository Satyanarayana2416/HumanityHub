const Donation = require('../models/Donation');

// @desc    Create donation
// @route   POST /api/donations
exports.createDonation = async (req, res) => {
    try {
        const donation = await Donation.create(req.body);
        res.status(201).json({ message: 'Thank you for your generous donation!', donation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all donations (Admin)
// @route   GET /api/donations
exports.getDonations = async (req, res) => {
    try {
        const donations = await Donation.find().sort('-createdAt');
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update donation status (Admin)
// @route   PUT /api/donations/:id
exports.updateDonation = async (req, res) => {
    try {
        const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!donation) return res.status(404).json({ message: 'Donation not found' });
        res.json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
