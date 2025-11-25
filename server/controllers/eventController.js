const Event = require('../models/Event');

exports.getUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ date: { $gte: now } })
      .sort({ date: 1 })
      .limit(6);

    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching events'
    });
  }
};

