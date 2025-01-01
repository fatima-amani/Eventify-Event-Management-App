import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import EventElement from "./EventElement";
import { useState,useEffect } from "react";


export default function TaskList() {
  const [events, setEvents] = useState([]); // Initialize state to hold events
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const getEventsTasksURL = "http://localhost:3000/task";

  const getTasks = async () => {
    try {  
      setLoading(true); // Set loading to true while fetching
      const response = await fetch(getEventsTasksURL);
      if (!response.ok) {
        throw new Error("Failed to fetch Tasks");
      }
      const data = await response.json();
      setEvents(data); // Update events state
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      setLoading(false); // Stop loading on error
      setError(err.message); // Set the error message
      alert("Error fetching Tasks: " + err.message); // Display alert with error
    }
  };

  const refreshTasks = () => {
    getTasks();
  };


  // Automatically fetch events when the component mounts
  useEffect(() => {
    getTasks();
  }, []); // Empty array means this effect runs only once when the component mounts

  return (
    <>
      
        
          
          {/* Loading state */}
          {loading && <p>Loading attendee...</p>}
  
          {/* Error state */}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}

          {/* Render events if available */}
          {events.length > 0 ? (events.map((event => <EventElement key={event._id} event={event} refreshTasks={refreshTasks}/>))
          ) : (
            // If no events and not loading, display "No events available"
            !loading && <p>No events available.</p>
          )}
        
      
    </>
  );
}
