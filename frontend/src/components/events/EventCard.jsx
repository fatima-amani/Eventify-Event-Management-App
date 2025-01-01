import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditEvent from './EditEvent';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import CreateTask from './CreateTask';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function EventCard({event, refreshEvents, OnEditEvent}) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const editEvent = () => {
    OnEditEvent(event);
  };

  const deleteEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        refreshEvents(); // Call the onDelete function to update the events list
      } else {
        alert("Failed to delete the event");
      }
    } catch (err) {
      alert("Error deleting event: " + err.message);
    }
  };

  const formattedDate = new Date(event.date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  });

  const addTask = () => {
    setIsAddingTask(true);
  }

  return (
    
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {event.name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}><LocationOnIcon/>{event.location}</Typography>
        <Typography variant="body2">
          <AccessTimeFilledIcon/> 
          {formattedDate}
          <br />
          <br />
          {event.description}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Add Atteendees</Button> */}
        {!isAddingTask && <Button size="small" onClick={addTask}>Add Task</Button>}
      </CardActions>
      {isAddingTask && <CreateTask setIsAddingTask={setIsAddingTask} eventID={event._id}/> }
      &nbsp;&nbsp;
      <br /><br />
      <Button variant="contained" onClick={editEvent}>Edit </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button variant="outlined" onClick={deleteEvent}>Delete</Button>
      <br /><br />
        
    </Card>
  );
}