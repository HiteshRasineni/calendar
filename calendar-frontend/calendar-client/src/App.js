import React, { useState, useEffect } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Auth from "./components/Auth";
import AllTasks from "./components/AllTasks";
import API from "./api";
import { format, addMonths, subMonths, parseISO } from "date-fns";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./components/About";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const addEvent = async (text) => {
    try {
      const event_date = format(selectedDate, 'yyyy-MM-dd');
      await API.post("/events", { event_text: text, event_date });
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await API.delete(`/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const editEvent = async (id, newText) => {
    try {
      await API.put(`/events/${id}`, { event_text: newText });
      fetchEvents();
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await API.patch(`/events/${id}/complete`, { completed });
      fetchEvents();
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  useEffect(() => {
    if (loggedIn) fetchEvents();
  }, [loggedIn]);

  if (!loggedIn) return <Auth setLoggedIn={setLoggedIn} />;

  const selectedDateString = format(selectedDate, 'yyyy-MM-dd');

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">My Calendar</h1>
            <nav className="navigation-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/all-tasks" className="nav-link">All Tasks</Link>
              <Link to="/about" className="nav-link">About</Link>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route 
              path="/all-tasks" 
              element={
                <AllTasks 
                  events={events} 
                  onDelete={deleteEvent} 
                  onEdit={editEvent} 
                  onToggleComplete={toggleComplete}
                />
              } 
            />
            <Route 
              path="/" 
              element={
                <div className="calendar-container">
                  <div className="calendar-section">
                    <div className="month-navigation">
                      <button 
                        className="nav-button prev"
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                      >
                        ‹
                      </button>
                      <h2 className="month-title">{format(currentMonth, "MMMM yyyy")}</h2>
                      <button 
                        className="nav-button next"
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                      >
                        ›
                      </button>
                    </div>

                    <Calendar 
                      currentMonth={currentMonth} 
                      selectedDate={selectedDate} 
                      onDateClick={setSelectedDate} 
                    />
                  </div>

                  <div className="events-section">
                    <EventForm onAddEvent={addEvent} />
                    <EventList 
                      events={events.filter(e => 
                        format(parseISO(e.event_date), 'yyyy-MM-dd') === selectedDateString
                      )} 
                      selectedDate={selectedDateString}
                      onDelete={deleteEvent} 
                      onToggleComplete={toggleComplete}
                    />
                  </div>

                  <button 
                    className="logout-button"
                    onClick={() => {
                      localStorage.removeItem("token");
                      setLoggedIn(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;


