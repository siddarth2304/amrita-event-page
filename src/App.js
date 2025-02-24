import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "./App.css";

const initialEvents = [
  { id: "1", title: "AI Workshop", date: "2025-02-21", time: "15:00", points: 5, details: "Learn about AI trends.", type: "workshop" },
  { id: "2", title: "Guest Lecture", date: "2025-02-25", time: "10:00", points: 10, details: "Talk by an industry expert.", type: "lecture" },
  { id: "3", title: "Research Seminar", date: "2025-02-27", time: "12:30", points: 7, details: "Deep dive into AI research.", type: "seminar" },
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
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", points: "", details: "", type: "workshop" });
  const [showAddEvent, setShowAddEvent] = useState(false);

  const handleEventClick = (clickInfo) => {
    const event = events.find((e) => e.id === clickInfo.event.id);
    setSelectedEvent(event);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.points || !newEvent.details) {
      alert("Please fill in all fields!");
      return;
    }

    const newEventData = { ...newEvent, id: String(events.length + 1) };
    setEvents([...events, newEventData]);
    setNewEvent({ title: "", date: "", time: "", points: "", details: "", type: "workshop" });
    setShowAddEvent(false);
  };

  return (
    <div className="calendar-wrapper">
      {/* Navbar */}
      <div className="navbar">
        <h1 className="navbar-title">📅 Event & Point Management</h1>
        <div className="navbar-links">
          <a href="#">Home</a>
          <a href="#">Events</a>
          <a href="#">Profile</a>
          <button className="add-event-btn" onClick={() => setShowAddEvent(true)}>+ Add Event</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        {/* Calendar */}
        <div className="calendar-container">
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
              start: `${event.date}T${event.time}`,
              backgroundColor: getEventColor(event.type),
              borderColor: getEventColor(event.type),
            }))}
            eventClick={handleEventClick}
          />
        </div>

        {/* Event Details Sidebar */}
        <div className={`event-sidebar ${selectedEvent ? "show" : "hidden"}`}>
          {selectedEvent ? (
            <div className="event-details">
              <h2>{selectedEvent.title}</h2>
              <p><strong>📅 Date:</strong> {selectedEvent.date} at {selectedEvent.time}</p>
              <p><strong>⭐ Points:</strong> {selectedEvent.points}</p>
              <p><strong>ℹ️ Details:</strong> {selectedEvent.details}</p>
            </div>
          ) : (
            <p className="no-event-msg">Click on an event to see details.</p>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowAddEvent(false)}>✖</button>
            <h2>Add New Event</h2>
            <div className="event-form">
              <input type="text" placeholder="Event Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
              <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} />
              <input type="number" placeholder="Points" value={newEvent.points} onChange={(e) => setNewEvent({ ...newEvent, points: e.target.value })} />
              <textarea placeholder="Event Details" value={newEvent.details} onChange={(e) => setNewEvent({ ...newEvent, details: e.target.value })} />
              <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}>
                <option value="workshop">Workshop</option>
                <option value="lecture">Lecture</option>
                <option value="seminar">Seminar</option>
              </select>
              <button onClick={handleAddEvent}>Add Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTracker;

