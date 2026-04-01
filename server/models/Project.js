const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a project title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600'
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Education', 'Healthcare', 'Environment', 'Community', 'Disaster Relief', 'Women Empowerment', 'Child Welfare']
    },
    impact: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['ongoing', 'completed', 'upcoming'],
        default: 'ongoing'
    },
    startDate: {
        type: Date
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
