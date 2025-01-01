import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function EditEvent({ event, setEditingEvent, setIsEditing, refreshEvents }) {
  // Local state to track form data
  const [formData, setFormData] = useState({
    name: event.name,
    description: event.description,
    location: event.location,
    date: event.date, // The initial date passed from the event
  });

  useEffect(() => {
    // Update form data when the `event` prop changes
    setFormData({
      name: event.name,
      description: event.description,
      location: event.location,
      date: event.date,
    });
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the date before submitting (convert to ISO 8601)
    const formattedDate = new Date(formData.date).toISOString(); // Convert to ISO string

    const updatedEventData = { ...formData, date: formattedDate };

    try {
      const response = await fetch(`http://localhost:3000/events/${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the request content type to JSON
        },
        body: JSON.stringify(updatedEventData), // Send the updated event data
      });

      if (response.ok) {
        setEditingEvent(false); // Close the editing form
        refreshEvents(); // Trigger refresh of events
        alert("Event updated successfully");
      } else {
        alert("Failed to update the event");
      }
    } catch (err) {
      alert("Error updating event: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Event Name"
        variant="outlined"
        value={formData.name}
        onChange={handleInputChange}
        name="name"
        fullWidth
        margin="normal"
      />
      <br />
      <TextField
        label="Description"
        variant="outlined"
        value={formData.description}
        onChange={handleInputChange}
        name="description"
        fullWidth
        margin="normal"
      />
      <br />
      <TextField
        label="Location"
        variant="outlined"
        value={formData.location}
        onChange={handleInputChange}
        name="location"
        fullWidth
        margin="normal"
      />
      <br />
      <TextField
        label="Date"
        type="datetime-local"
        variant="outlined"
        value={formData.date ? formData.date.slice(0, 16) : ""} // Format the date to match the input type
        onChange={handleInputChange}
        name="date"
        fullWidth
        margin="normal"
        
      />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      &nbsp; &nbsp;
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={() => setEditingEvent(false)}
      >
        Cancel
      </Button>
    </form>
  );
}
