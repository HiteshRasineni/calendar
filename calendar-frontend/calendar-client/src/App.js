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
        <h1>My Calendar</h1>
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={
            <>
              <div className="navigation">
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>‹</button>
                <h2>{format(currentMonth, "MMMM yyyy")}</h2>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>›</button>
              </div>
              <Calendar currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={setSelectedDate} />
              <EventForm onAddEvent={addEvent} />
              <EventList 
                events={events.filter(e => format(new Date(e.event_date), 'yyyy-MM-dd') === selectedDateString)} 
                selectedDate={selectedDateString}
                onDelete={deleteEvent} 
              />
              <button onClick={() => { localStorage.removeItem("token"); setLoggedIn(false); }}>
                Logout
              </button>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

