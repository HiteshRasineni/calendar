import React, { useState } from "react";

const EventForm = ({ onAddEvent }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddEvent(text);
      setText("");
    }
  };

  return (
    <div className="event-form">
      <h3>Add New Event</h3>
      <form onSubmit={handleSubmit}>
        <div className="event-input-group">
          <input 
            className="event-input"
            type="text"
            placeholder="Enter event description"
            value={text} 
            onChange={(e) => setText(e.target.value)} 
          />
          <button className="event-submit-button" type="submit">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;

