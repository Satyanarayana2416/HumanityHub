const Contact = require('../models/Contact');

// @desc    Submit contact message
// @route   POST /api/contacts
exports.createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ message: 'Thank you for your message! We will get back to you soon.', contact });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all contacts (Admin)
// @route   GET /api/contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort('-createdAt');
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark contact as read (Admin)
// @route   PUT /api/contacts/:id
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete contact (Admin)
// @route   DELETE /api/contacts/:id
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json({ message: 'Contact removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
