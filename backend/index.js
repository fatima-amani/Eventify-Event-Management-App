const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventsRouter = require("./routes/event.js");
const attendeeRouter = require("./routes/attendee.js");
const taskRouter = require("./routes/task.js");
const cors = require('cors');



const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/event-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));



app.use("/events",eventsRouter);
app.use("/attendee",attendeeRouter);
app.use("/task",taskRouter);


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
