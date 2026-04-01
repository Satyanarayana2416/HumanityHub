const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
        required: [true, 'Please add a donation amount'],
        min: [1, 'Amount must be at least 1']
    },
    message: {
        type: String,
        default: ''
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'upi', 'bank_transfer', 'other'],
        default: 'card'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);
