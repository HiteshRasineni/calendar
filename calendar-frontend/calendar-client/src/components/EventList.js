import React from "react";

const EventList = ({ events, selectedDate, onDelete }) => (
  <div>
    <h3>Events for {selectedDate}</h3>
    {events.length === 0 ? (
      <p>No events for this date.</p>
    ) : (
      <ul>
        {events.map((e) => (
          <li key={e.id}>
            {e.event_text}
            <button onClick={() => onDelete(e.id)} style={{ marginLeft: "10px" }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default EventList;

