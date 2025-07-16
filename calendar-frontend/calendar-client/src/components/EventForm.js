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
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add event" />
      <button type="submit">Add</button>
    </form>
  );
};

export default EventForm;
