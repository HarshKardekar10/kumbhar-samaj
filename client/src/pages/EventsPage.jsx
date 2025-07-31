import React from 'react';
import EventCard from '../components/EventCard';

const EventsPage = () => (
  <div>
    <h2>Upcoming Events</h2>
    <EventCard title="Annual Gathering" date="2025-09-10" location="Pune" />
    <EventCard title="Youth Meetup" date="2025-08-05" location="Nashik" />
  </div>
);

export default EventsPage;
