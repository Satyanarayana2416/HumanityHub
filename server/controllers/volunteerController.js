const Volunteer = require('../models/Volunteer');

// @desc    Register as volunteer
// @route   POST /api/volunteers
exports.createVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.create(req.body);
        res.status(201).json({ message: 'Thank you for registering as a volunteer!', volunteer });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all volunteers (Admin)
// @route   GET /api/volunteers
exports.getVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort('-createdAt');
        res.json(volunteers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update volunteer status (Admin)
// @route   PUT /api/volunteers/:id
exports.updateVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
        res.json(volunteer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete volunteer (Admin)
// @route   DELETE /api/volunteers/:id
exports.deleteVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
        if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
        res.json({ message: 'Volunteer removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
