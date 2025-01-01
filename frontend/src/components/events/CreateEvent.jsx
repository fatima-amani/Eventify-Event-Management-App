import { useState } from "react";

export default function CreateEvent({ setIsCreating, refreshEvents }) {
  // Local state to track form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "", 
    attendees:[],
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
      <label htmlFor="name">Event Name</label> &nbsp;&nbsp;
      <input
        type="text"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleInputChange}
        id="name"
        name="name"
      />
      <br />
      <br />
      <label htmlFor="description">Description</label> &nbsp;&nbsp;
      <input
        type="text"
        placeholder="Enter description"
        value={formData.description}
        onChange={handleInputChange}
        id="description"
        name="description"
      />
      <br /><br />
      <label htmlFor="location">Location</label> &nbsp;&nbsp;
      <input
        type="text"
        placeholder="Enter location"
        value={formData.location}
        onChange={handleInputChange}
        id="location"
        name="location"
      />
      <br />
      <br />
      <label htmlFor="date">Date</label> &nbsp;&nbsp;
      <input
        type="datetime-local" // Use the `datetime-local` input type for better date selection
        value={formData.date}
        onChange={handleInputChange}
        id="date"
        name="date"
      />
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
