const express = require("express");
const mongoose = require('mongoose');
const Event = require('../models/event.js');  
const Attendee = require('../models/attendee.js');

// get all events
module.exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('attendees');
    res.status(200).json(events);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: err.message });
  }
};

// Create an event
module.exports.createEvent = async (req, res) => {
  try {
    const { name, description, location, date, attendees } = req.body;

    const validAttendees = await Attendee.find({ '_id': { $in: attendees } });
    if (validAttendees.length !== attendees.length) {
      return res.status(400).json({ message: "Some attendees are invalid" });
    }

    const event = new Event({ name, description, location, date, attendees });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create event", error: err.message });
  }
};

// Update an event
module.exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location, date, attendees } = req.body;

    // Check if all attendees exist in the database
    if (attendees && attendees.length > 0) {
      const validAttendees = await Attendee.find({ '_id': { $in: attendees } });
      if (validAttendees.length !== attendees.length) {
        return res.status(400).json({ message: "Some attendees are invalid" });
      }
    }
    
    const event = await Event.findByIdAndUpdate(
      id,
      { name, description, location, date, attendees },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update event", error: err.message });
  }
};

// Delete an event
module.exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete event", error: err.message });
  }
};
