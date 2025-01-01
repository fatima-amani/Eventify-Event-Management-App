import { useState, useEffect } from "react";

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
        type="datetime-local" // Use datetime-local for date-time input
        value={formData.date ? formData.date.slice(0, 16) : ""} // Format the date to match the input type
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
