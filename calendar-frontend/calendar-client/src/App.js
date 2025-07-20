import React, { useState, useEffect } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Auth from "./components/Auth";
import API from "./api";
import { format, addMonths, subMonths } from "date-fns";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./components/About";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await API.get("/events");
    setEvents(res.data);
  };

  const addEvent = async (text) => {
    const event_date = format(selectedDate, 'yyyy-MM-dd');
    await API.post("/events", { event_text: text, event_date });
    fetchEvents();
  };

  const deleteEvent = async (id) => {
    await API.delete(`/events/${id}`);
    fetchEvents();
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
              <Link to="/about" className="nav-link">About</Link>
            </nav>
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={
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
                    events={events.filter(e => format(new Date(e.event_date), 'yyyy-MM-dd') === selectedDateString)} 
                    selectedDate={selectedDateString}
                    onDelete={deleteEvent} 
                  />
                </div>
                
                <button 
                  className="logout-button"
                  onClick={() => { localStorage.removeItem("token"); setLoggedIn(false); }}
                >
                  Logout
                </button>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;


