import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay
} from "date-fns";

const Calendar = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let days = [];
  let day = startDate;

  for (let i = 0; i < 42; i++) {
    const formattedDate = format(day, "d");
    const cloneDay = day;
    days.push(
      <div
        className={`cell ${!isSameMonth(day, monthStart) ? "disabled" : ""} ${
          isSameDay(day, selectedDate) ? "selected" : ""
        }`}
        key={day}
        onClick={() => onDateClick(cloneDay)}
      >
        <span>{formattedDate}</span>
      </div>
    );
    day = addDays(day, 1);
  }

  return (
    <div className="calendar">
      <div className="calendar-grid weekdays">
        {weekdays.map((dayName) => (
          <div key={dayName} className="weekday">
            {dayName}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
        {days}
      </div>
    </div>
  );
};

export default Calendar;
