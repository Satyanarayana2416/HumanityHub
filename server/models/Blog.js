const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    excerpt: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        required: [true, 'Please add an author'],
        default: 'HumanityHub Foundation'
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600'
    },
    tags: [{
        type: String
    }],
    published: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
