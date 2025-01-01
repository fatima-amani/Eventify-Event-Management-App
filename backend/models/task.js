const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Task schema
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Completed'], 
    default: 'Pending' 
  },
  assignedAttendee: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Attendee', 
    }
  ]
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
