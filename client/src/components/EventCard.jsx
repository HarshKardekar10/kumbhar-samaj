import React from 'react';

const EventCard = ({ title, date, location }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">Date: {date}</p>
      <p className="card-text">Location: {location}</p>
    </div>
  </div>
);

export default EventCard;
