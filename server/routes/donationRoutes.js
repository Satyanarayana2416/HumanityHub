const express = require('express');
const router = express.Router();
const { createDonation, getDonations, updateDonation } = require('../controllers/donationController');
const { protect, admin } = require('../middleware/auth');

router.route('/').post(createDonation).get(protect, admin, getDonations);
router.route('/:id').put(protect, admin, updateDonation);

module.exports = router;
