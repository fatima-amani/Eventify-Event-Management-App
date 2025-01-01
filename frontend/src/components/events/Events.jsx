import React, { useState, useEffect } from "react";
import EventCard from "./EventCard.jsx";
import EditEvent from "./EditEvent.jsx";
import CreateEvent from "./CreateEvent.jsx";
import Button from '@mui/material/Button';



export default function Events() {
  const [events, setEvents] = useState([]); // Initialize state to hold events
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const getEventsURL = "http://localhost:3000/events";

  const getEvents = async () => {
    try {  
      setLoading(true); // Set loading to true while fetching
      const response = await fetch(getEventsURL);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data); // Update events state
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      setLoading(false); // Stop loading on error
      setError(err.message); // Set the error message
      alert("Error fetching events: " + err.message); // Display alert with error
    }
  };

  const refreshEvents = (eventId) => {
    getEvents();
  };

  const OnEditEvent = (eventDetail) => {
    setIsEditing(true);
    setEditingEvent(eventDetail);
  };

  const OnCreateEvent = () => {
    setIsCreating(true);
  }

  // Automatically fetch events when the component mounts
  useEffect(() => {
    getEvents();
  }, []); // Empty array means this effect runs only once when the component mounts

  return (
    <>
      {editingEvent ? (
        // Render the EditEvent component if editingEvent is true
        <EditEvent
          event={editingEvent}
          setEditingEvent={setEditingEvent}
          setIsEditing={setIsEditing}
          refreshEvents={refreshEvents}
        />
      ) : isCreating ? (
        // Render the Create Form if creatingEvent is true
        <>
            <CreateEvent setIsCreating={setIsCreating} refreshEvents={refreshEvents}/>
        </>
      ) : (
        <>
          <h2>Add a New Event Today !!! &nbsp; &nbsp;
            <Button variant="contained" onClick={OnCreateEvent} >Create new Event </Button>
            </h2>
          {/* Loading state */}
          {loading && <p>Loading events...</p>}
  
          {/* Error state */}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}

          {/* Render events if available */}
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                refreshEvents={refreshEvents}
                OnEditEvent={OnEditEvent}
              />
            ))
          ) : (
            // If no events and not loading, display "No events available"
            !loading && <p>No events available.</p>
          )}
        </>
      )}
    </>
  );
}
