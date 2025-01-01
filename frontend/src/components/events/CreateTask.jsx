import { useState } from "react";

export default function CreateTask({ setIsAddingTask, eventID }) {
  const [formData, setFormData] = useState({
    name: "",
    deadline: "",
    status: "Pending", 
    event:eventID,
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
      // Include eventID in the formData
      const taskData = { ...formData, event: eventID };

      const response = await fetch(`http://localhost:3000/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setIsAddingTask(false);
        alert("Task added successfully");
      } else {
        alert("Failed to add the task");
      }
    } catch (err) {
      alert("Error adding task: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a new Task for this event !!</h3>
      <label htmlFor="name">Task Name</label> &nbsp;&nbsp;
      <input
        type="text"
        placeholder="Enter Task Name"
        value={formData.name}
        onChange={handleInputChange}
        id="name"
        name="name"
        required
      />
      <br />
      <br />

      <label htmlFor="deadline">Deadline</label> &nbsp;&nbsp;
      <input
        type="date"
        value={formData.deadline}
        onChange={handleInputChange}
        id="deadline"
        name="deadline"
        required
      />
      <br />
      <br />

      <label htmlFor="status">Status</label> &nbsp;&nbsp;
      <select
        value={formData.status}
        onChange={handleInputChange}
        id="status"
        name="status"
        required
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <br />
      <br />

      <button type="submit">Submit</button>
      &nbsp;&nbsp;
      <button
        type="button"
        onClick={() => setIsAddingTask(false)}
      >
        Cancel
      </button>
    </form>
  );
}
