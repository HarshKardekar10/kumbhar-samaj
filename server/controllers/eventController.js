    const Event = require('../models/Event');

    // @desc    Get all events
    // @route   GET /api/events
    // @access  Public
    exports.getEvents = async (req, res) => {
      try {
        const events = await Event.findAll({ order: [['date', 'DESC']] });
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
      }
    };

    // @desc    Create an event
    // @route   POST /api/events
    // @access  Private (for admins)
    exports.createEvent = async (req, res) => {
      try {
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
      } catch (error) {
        res.status(500).json({ message: 'Failed to create event', error: error.message });
      }
    };
    