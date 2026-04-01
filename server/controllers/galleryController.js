const Gallery = require('../models/Gallery');

// @desc    Get all gallery items
// @route   GET /api/gallery
exports.getGalleryItems = async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};
        if (category) filter.category = category;
        const items = await Gallery.find(filter).sort('-createdAt');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create gallery item (Admin)
// @route   POST /api/gallery
exports.createGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update gallery item (Admin)
// @route   PUT /api/gallery/:id
exports.updateGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: 'Gallery item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete gallery item (Admin)
// @route   DELETE /api/gallery/:id
exports.deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Gallery item not found' });
        res.json({ message: 'Gallery item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
