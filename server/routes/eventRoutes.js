const express = require('express');
const router = express.Router();
const { getUpcomingEvents } = require('../controllers/eventController');

router.get('/upcoming', getUpcomingEvents);

module.exports = router;

