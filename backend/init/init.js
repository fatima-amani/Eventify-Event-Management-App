const mongoose = require('mongoose');
const Attendee = require('../models/attendee');
const Event = require('../models/event');
const Task = require('../models/task');

// Sample Attendees
const attendees = [
  { name: 'Fatima Amani' },
  { name: 'Apeksha D Ankola' },
  { name: 'Aamna Siddiqui' },
  { name: 'Alakananda GM' },
  { name: 'Darshana Nagar' }
];

// Sample Events
const events = [
  { 
    name: 'Tech Conference', 
    description: 'A conference about the latest in tech.', 
    location: 'New York', 
    date: new Date('2024-06-15T09:00:00Z'), 
    attendees: [], 
    tasks: []
  },
  { 
    name: 'Music Festival', 
    description: 'A festival celebrating music from around the world.',
    location: 'Los Angeles', 
    date: new Date('2024-07-01T10:00:00Z'), 
    attendees: [],
    tasks: []
  }
];

// Sample Tasks
const tasks = [
  [
    { name: 'Set up stage', deadline: new Date('2024-06-14T15:00:00Z'), status: 'Pending' },
    { name: 'Arrange speakers', deadline: new Date('2024-06-14T12:00:00Z'), status: 'Pending' },
    { name: 'Prepare presentation materials', deadline: new Date('2024-06-14T10:00:00Z'), status: 'Pending' }
  ],
  [
    { name: 'Stage setup', deadline: new Date('2024-06-30T15:00:00Z'), status: 'Pending' },
    { name: 'Artist coordination', deadline: new Date('2024-06-30T12:00:00Z'), status: 'Pending' },
    { name: 'Prepare sound equipment', deadline: new Date('2024-06-30T10:00:00Z'), status: 'Pending' }
  ]
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/event-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');

  // Clear existing data
  await Attendee.deleteMany({});
  await Event.deleteMany({});
  await Task.deleteMany({});

  // Insert attendees
  const createdAttendees = await Attendee.insertMany(attendees);

  // Map attendee IDs to the events
  events[0].attendees = createdAttendees.slice(0, 3).map(attendee => attendee._id); // First 3 attendees
  events[1].attendees = createdAttendees.slice(3).map(attendee => attendee._id); // Last 2 attendees

  // Insert events
  const createdEvents = await Event.insertMany(events);

  // Insert tasks for each event
  for (let i = 0; i < createdEvents.length; i++) {
    const eventId = createdEvents[i]._id;
    const eventTasks = tasks[i].map((task, index) => ({
      ...task,
      assignedAttendee: createdAttendees[index]._id // Assigning attendees to tasks
    }));
    const createdTasks = await Task.insertMany(eventTasks);

    // Update event with task IDs
    createdEvents[i].tasks = createdTasks.map(task => task._id);
    await createdEvents[i].save();
  }

  console.log('Sample data added successfully!');
  process.exit();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});
