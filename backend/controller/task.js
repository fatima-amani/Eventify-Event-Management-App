const Task = require('../models/task.js');
const Attendee = require('../models/attendee.js');
const Event = require('../models/event.js');

// Create a task
module.exports.createTask = async (req, res) => {
  try {
    const { name, deadline, status,event } = req.body; // Destructure input data

    // Check if event exists
    const eventDoc = await Event.findById(event);
    if (!eventDoc) {
      return res.status(400).json({ message: "Event not found" });
    }

    // Create task (without assignedAttendee)
    const task = new Task({ name:name, deadline:deadline, status:status,assignedAttendee:[] });
    await task.save();

    // Add the task ID to the event's tasks array
    eventDoc.tasks.push(task._id);
    await eventDoc.save();

    res.status(201).json(task); // Respond with the created task
  } catch (err) {
    res.status(400).json({ message: "Failed to create task", error: err.message });
  }
};

module.exports.getTasks = async (req, res) => {
  try {
    const events = await Event.find().populate('tasks');
    res.status(200).json(events);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch Tasks", error: err.message });
  }
};

// Get all tasks for a specific event
module.exports.getTasksForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find tasks related to the event and populate attendee details
    const tasks = await Task.find({ event: eventId }).populate('assignedAttendee');
    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found for this event" });
    }

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
};

// Update task status
module.exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    // Check if the status is valid
    if (!['Pending', 'Completed'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Update the task status
    const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: "Failed to update task status", error: err.message });
  }
};
