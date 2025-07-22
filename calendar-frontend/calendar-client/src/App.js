import React, { useState, useEffect } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Auth from "./components/Auth";
import AllTasks from "./components/AllTasks";
import API from "./api";
import { format, addMonths, subMonths } from "date-fns";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./components/About";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);

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

  const editEvent = async (id, newText) => {
    await API.put(`/events/${id}`, { event_text: newText });
    fetchEvents();
  };

  useEffect(() => {
    if (loggedIn) fetchEvents();
  }, [loggedIn]);

  if (!loggedIn) return <Auth setLoggedIn={setLoggedIn} />;

  const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = currentMonth.getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  
  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(monthIndex);
    setCurrentMonth(newDate);
    setShowMonthSelector(false);
  };
  
  const handleYearSelect = (year) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setShowYearSelector(false);
  };

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
            <Route path="/all-tasks" element={
              <AllTasks 
                events={events} 
                onDelete={deleteEvent} 
                onEdit={editEvent} 
              />
            } />
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
                    <div className="month-year-selector">
                      <div className="month-selector-container">
                        <span 
                          className="month-selector-title"
                          onClick={() => {
                            setShowMonthSelector(!showMonthSelector);
                            setShowYearSelector(false);
                          }}
                        >
                          {format(currentMonth, "MMMM")}
                        </span>
                        {showMonthSelector && (
                          <div className="selector-dropdown month-dropdown">
                            {months.map((month, index) => (
                              <div
                                key={month}
                                className={`selector-option ${index === currentMonth.getMonth() ? 'active' : ''}`}
                                onClick={() => handleMonthSelect(index)}
                              >
                                {month}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="year-selector-container">
                        <span 
                          className="year-selector-title"
                          onClick={() => {
                            setShowYearSelector(!showYearSelector);
                            setShowMonthSelector(false);
                          }}
                        >
                          {format(currentMonth, "yyyy")}
                        </span>
                        {showYearSelector && (
                          <div className="selector-dropdown year-dropdown">
                            {years.map((year) => (
                              <div
                                key={year}
                                className={`selector-option ${year === currentYear ? 'active' : ''}`}
                                onClick={() => handleYearSelect(year)}
                              >
                                {year}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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


