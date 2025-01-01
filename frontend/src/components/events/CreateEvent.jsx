import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function CreateEvent({ setIsCreating, refreshEvents }) {
  // Local state to track form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "", 
    attendees: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the date input value before sending to the backend
    const formattedDate = new Date(formData.date).toISOString(); // Convert to ISO 8601 format

    const eventData = { ...formData, date: formattedDate }; // Include the formatted date

    try {
      const response = await fetch(`http://localhost:3000/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the request content type to JSON
        },
        body: JSON.stringify(eventData), // Send the event data with the formatted date
      });

      if (response.ok) {
        setIsCreating(false); // Close the form (or switch to another state)
        refreshEvents(); // Trigger refresh of events
        alert("Event created successfully");
      } else {
        alert("Failed to create the event");
      }
    } catch (err) {
      alert("Error creating event: " + err.message);
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
        value={formData.date}
        onChange={handleInputChange}
        name="date"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true, // Ensures the label stays on top for the datetime input
        }}
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
        onClick={() => setIsCreating(false)}
      >
        Cancel
      </Button>
    </form>
  );
}
