const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please add your phone number']
    },
    address: {
        type: String,
        required: [true, 'Please add your address']
    },
    interestArea: {
        type: String,
        required: [true, 'Please select an interest area'],
        enum: ['Education', 'Healthcare', 'Environment', 'Community Development', 'Disaster Relief', 'Women Empowerment', 'Child Welfare', 'Other']
    },
    message: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
