import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AttendeeCard from "./AttendeeCard";
import CreateAttendee from "./CreateAttendee";



export default function Attendees() {
  const [attendees, setAttendees] = useState([]); // Initialize state to hold events
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const [isCreating, setIsCreating] = useState(false);
  const getAttendeeURL = "http://localhost:3000/attendee";

  const getAttendees = async () => {
    try {  
      setLoading(true); // Set loading to true while fetching
      const response = await fetch(getAttendeeURL);
      if (!response.ok) {
        throw new Error("Failed to fetch attendees");
      }
      const data = await response.json();
      setAttendees(data); // Update events state
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      setLoading(false); // Stop loading on error
      setError(err.message); // Set the error message
      alert("Error fetching Attendees: " + err.message); // Display alert with error
    }
  };

  const refreshAttendees = () => {
    getAttendees();
  };

  const OnCreateEvent = () => {
    setIsCreating(true);
  }

  // Automatically fetch events when the component mounts
  useEffect(() => {
    getAttendees();
  }, []); // Empty array means this effect runs only once when the component mounts

  return (
    <>
      {isCreating ? (
        <CreateAttendee setIsCreating={setIsCreating} refreshAttendees={refreshAttendees}/>
      ) : (
        <>
          <h2>Add a New Attendee &nbsp; &nbsp;
            <Button variant="contained" onClick={OnCreateEvent} >Add Attendee </Button>
            </h2>
          {/* Loading state */}
          {loading && <p>Loading attendee...</p>}
  
          {/* Error state */}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}

          {/* Render events if available */}
          {attendees.length > 0 ? (
            <AttendeeCard attendees={attendees} refreshAttendees={refreshAttendees}/>
          ) : (
            // If no events and not loading, display "No events available"
            !loading && <p>No events available.</p>
          )}
        </>
      )}
    </>
  );
}
