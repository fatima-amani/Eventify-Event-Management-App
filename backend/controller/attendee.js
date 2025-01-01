const express = require("express");
const Attendee = require('../models/attendee.js');

// get all attendee
module.exports.getAttendee = async (req, res) => {
  try {
    const attendee = await Attendee.find();
    res.status(200).json(attendee);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch Attendees", error: err.message });
  }
};

// Create an attendee
module.exports.createAttendee = async (req, res) => {
  try {
    const { name } = req.body;
    const attendee = new Attendee({ name });
    await attendee.save();
    res.status(201).json(attendee);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create Attendee", error: err.message });
  }
};

// Delete an attendee
module.exports.deleteAttendee = async (req, res) => {
  try {
    const { id } = req.params;
    const attendee = await Attendee.findByIdAndDelete(id);

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    res.status(200).json({ message: "Attendee deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete Attendee", error: err.message });
  }
};
