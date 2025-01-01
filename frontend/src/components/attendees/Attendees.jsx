import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AttendeeCard from "./AttendeeCard";
import CreateAttendee from "./CreateAttendee";
import AssignAttendee from "./AssignAttendee";

export default function Attendees() {
  const [attendees, setAttendees] = useState([]); // Initialize state to hold attendees
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const [isCreating, setIsCreating] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);

  const getAttendeeURL = "http://localhost:3000/attendee";

  const getAttendees = async () => {
    try {
      setLoading(true); // Set loading to true while fetching
      const response = await fetch(getAttendeeURL);
      if (!response.ok) {
        throw new Error("Failed to fetch attendees");
      }
      const data = await response.json();
      setAttendees(data); // Update attendees state
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

  const onCreateAttendee = () => {
    setIsCreating(true);
  };

  const onAssignAttendee = () => {
    setIsAssigning(true);
  };

  // Automatically fetch attendees when the component mounts
  useEffect(() => {
    getAttendees();
  }, []); // Empty array means this effect runs only once when the component mounts

  return (
    <>
      {isCreating ? (
        <CreateAttendee
          setIsCreating={setIsCreating}
          refreshAttendees={refreshAttendees}
        />
      ) : isAssigning ? (
        <AssignAttendee
          setIsAssigning={setIsAssigning}
          refreshAttendees={refreshAttendees}
          attendees={attendees}
        />
      ) : (
        <>
          <h2>
            Add a New Attendee &nbsp; &nbsp;
            <Button variant="contained" onClick={onCreateAttendee}>
              Add Attendee
            </Button>
          </h2>

          <h2>
            Assign to an Attendee &nbsp; &nbsp;
            <Button variant="contained" onClick={onAssignAttendee}>
              Assign Task
            </Button>
          </h2>

          {/* Loading state */}
          {loading && <p>Loading attendees...</p>}

          {/* Error state */}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}

          {/* Render attendees if available */}
          {attendees.length > 0 ? (
            <AttendeeCard
              attendees={attendees}
              refreshAttendees={refreshAttendees}
            />
          ) : (
            !loading && <p>No Attendee available.</p>
          )}
        </>
      )}
    </>
  );
}
