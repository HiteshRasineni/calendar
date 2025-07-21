import React, { useState } from "react";
import { format, getYear, parseISO } from "date-fns";

const AllTasks = ({ events, onDelete, onEdit, onToggleComplete }) => {
  const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
  const [editingEvent, setEditingEvent] = useState(null);
  const [editText, setEditText] = useState("");

  // Get unique years from events
  const years = [...new Set(events.map(event => getYear(parseISO(event.event_date))))]
    .sort((a, b) => b - a);

  // Filter events by selected year
  const filteredEvents = events.filter(event => 
    getYear(parseISO(event.event_date)) === selectedYear
  );

  // Sort events by date
  const sortedEvents = filteredEvents.sort((a, b) => 
    new Date(a.event_date) - new Date(b.event_date)
  );

  const handleEditStart = (event) => {
    setEditingEvent(event.id);
    setEditText(event.event_text);
  };

  const handleEditSave = async (eventId) => {
    if (editText.trim()) {
      await onEdit(eventId, editText);
      setEditingEvent(null);
      setEditText("");
    }
  };

  const handleEditCancel = () => {
    setEditingEvent(null);
    setEditText("");
  };

  return (
    <div className="all-tasks-container">
      <div className="all-tasks-header">
        <h2>All Tasks</h2>
        <div className="year-filter">
          <label htmlFor="year-select">Filter by Year:</label>
          <select 
            id="year-select"
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="year-dropdown"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="tasks-summary">
        <p className="task-count">
          {sortedEvents.length} task{sortedEvents.length !== 1 ? 's' : ''} in {selectedYear}
        </p>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks found for {selectedYear}</p>
        </div>
      ) : (
        <div className="tasks-list">
          {sortedEvents.map((event) => (
            <div key={event.id} className="task-card">
              <div className="task-date">
                {format(parseISO(event.event_date), 'MMM dd, yyyy')}
              </div>
              
              <div className="task-content">
                {editingEvent === event.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button 
                        onClick={() => handleEditSave(event.id)}
                        className="save-button"
                      >
                        Save
                      </button>
                      <button 
                        onClick={handleEditCancel}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="task-display">
                    <input
                      type="checkbox"
                      checked={!!event.completed}
                      onChange={() => onToggleComplete(event.id, !event.completed)}
                    />
                    <span className={`task-text${event.completed ? ' completed' : ''}`}>{event.event_text}</span>
                    <div className="task-actions">
                      <button 
                        onClick={() => handleEditStart(event)}
                        className="edit-button"
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => onDelete(event.id)}
                        className="delete-button"
                        title="Delete task"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTasks;

