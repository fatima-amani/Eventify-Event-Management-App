import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function CreateAttendee({ setIsCreating, refreshAttendees }) {
  // Local state to track form data
  const [formData, setFormData] = useState({
    name: "",
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

    try {
      const response = await fetch(`http://localhost:3000/attendee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the request content type to JSON
        },
        body: JSON.stringify(formData), // Send the event data with the formatted date
      });

      if (response.ok) {
        setIsCreating(false); // Close the form (or switch to another state)
        refreshAttendees(); // Trigger refresh of events
        alert("Attendee Added successfully");
      } else {
        alert("Failed to Add the Attendee");
      }
    } catch (err) {
      alert("Error adding attendee: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Attendee Name"
        variant="outlined"
        value={formData.name}
        onChange={handleInputChange}
        name="name"
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
        onClick={() => setIsCreating(false)}
      >
        Cancel
      </Button>
    </form>
  );
}
