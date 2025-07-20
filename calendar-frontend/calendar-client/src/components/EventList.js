import React from "react";

const EventList = ({ events, selectedDate, onDelete }) => (
  <div className="event-list">
    <h3>Events for {selectedDate}</h3>
    {events.length === 0 ? (
      <div className="no-events">
        <p>No events scheduled for this date.</p>
      </div>
    ) : (
      <ul>
        {events.map((e) => (
          <li key={e.id} className="event-item">
            <span className="event-text">{e.event_text}</span>
            <button 
              className="delete-button" 
              onClick={() => onDelete(e.id)}
              title="Delete event"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default EventList;


