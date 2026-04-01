const express = require('express');
const router = express.Router();
const { createVolunteer, getVolunteers, updateVolunteer, deleteVolunteer } = require('../controllers/volunteerController');
const { protect, admin } = require('../middleware/auth');

router.route('/').post(createVolunteer).get(protect, admin, getVolunteers);
router.route('/:id').put(protect, admin, updateVolunteer).delete(protect, admin, deleteVolunteer);

module.exports = router;
