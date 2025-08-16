import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${id}`);
        alert('Event deleted successfully!');
        fetchEvents(); // Refresh the list
      } catch (error) {
        alert('Failed to delete event.');
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Manage Events</h3>
        <Link to="/admin/dashboard/events/new" className="btn btn-primary">Add New Event</Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.location}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/dashboard/events/edit/${event.id}`} className="btn btn-sm btn-secondary me-2">Edit</Link>
                <button onClick={() => handleDelete(event.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvents;