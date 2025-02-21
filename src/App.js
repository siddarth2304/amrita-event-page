import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "react-responsive-modal/styles.css";
import "./App.css";

const eventsData = [
  { id: "1", title: "AI Workshop", date: "2025-02-21", time: "15:00", points: 5, type: "workshop" },
  { id: "2", title: "Guest Lecture", date: "2025-02-25", time: "10:00", points: 10, type: "lecture" },
  { id: "3", title: "Research Seminar", date: "2025-02-27", time: "12:30", points: 7, type: "seminar" },
];

const getEventColor = (type) => {
  switch (type) {
    case "workshop": return "#ff9800";
    case "lecture": return "#2196f3";
    case "seminar": return "#4caf50";
    default: return "#9e9e9e";
  }
};

const EventTracker = () => {
  const [events, setEvents] = useState(eventsData);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (clickInfo) => {
    const event = events.find((e) => e.id === clickInfo.event.id);
    setSelectedEvent(event);
  };

  const handleEventHover = (hoverInfo) => {
    const event = events.find((e) => e.id === hoverInfo.event.id);
    setSelectedEvent(event);
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-container">
        <h2 className="title">📅 Event & Point Management</h2>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          events={events.map(event => ({
            id: event.id,
            title: event.title,
            start: event.date,
            backgroundColor: getEventColor(event.type),
            borderColor: getEventColor(event.type)
          }))}
          eventClick={handleEventClick}
          eventMouseEnter={handleEventHover}
        />
      </div>

      {/* Sidebar for Event Details */}
      <div className="event-sidebar">
        {selectedEvent ? (
          <div className="event-details">
            <h2>{selectedEvent.title}</h2>
            <p>📅 Date: {selectedEvent.date} at {selectedEvent.time}</p>
            <p>⭐ Points: {selectedEvent.points}</p>
            <button 
              className="volunteer-btn" 
              onClick={() => {
                setEvents(events.map(e => 
                  e.id === selectedEvent.id ? { ...e, points: e.points + 5 } : e
                ));
                setSelectedEvent(null);
              }}>
              Volunteer (+5 Points)
            </button>
          </div>
        ) : (
          <p className="placeholder-text">Click or hover over an event to see details</p>
        )}
      </div>
    </div>
  );
};

export default EventTracker;
