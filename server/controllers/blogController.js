const Blog = require('../models/Blog');

// @desc    Get all blog posts
// @route   GET /api/blogs
exports.getBlogs = async (req, res) => {
    try {
        const { tag } = req.query;
        let filter = { published: true };
        if (tag) filter.tags = tag;
        const blogs = await Blog.find(filter).sort('-createdAt');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog post
// @route   GET /api/blogs/:id
exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog post not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create blog post (Admin)
// @route   POST /api/blogs
exports.createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update blog post (Admin)
// @route   PUT /api/blogs/:id
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) return res.status(404).json({ message: 'Blog post not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete blog post (Admin)
// @route   DELETE /api/blogs/:id
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog post not found' });
        res.json({ message: 'Blog post removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
