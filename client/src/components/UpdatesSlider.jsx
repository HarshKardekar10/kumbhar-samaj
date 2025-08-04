import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const UpdatesSlider = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Fetch both posts and events in parallel
        const [postsRes, eventsRes] = await Promise.all([
          api.get('/posts'),
          api.get('/events')
        ]);

        // Add a 'type' property to distinguish them
        const posts = postsRes.data.map(p => ({ ...p, type: 'post', date: p.createdAt }));
        const events = eventsRes.data.map(e => ({ ...e, type: 'event', date: e.date }));

        // Combine, sort by date, and take the 5 most recent items
        const combinedItems = [...posts, ...events]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        
        setItems(combinedItems);
      } catch (error) {
        console.error("Failed to fetch items for slider:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading Latest Updates...</div>;
  }

  if (items.length === 0) {
    return null; // Don't render if no items
  }

  return (
    <div id="updatesCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div key={`${item.type}-${item.id}`} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="4000">
            <img src={item.imageUrl} className="d-block w-100" alt={item.title} style={{ height: '60vh', objectFit: 'cover', filter: 'brightness(0.6)' }} />
            <div className="carousel-caption d-none d-md-block text-start" style={{ bottom: '20%', left: '10%', right: 'auto' }}>
              <span className="badge bg-primary mb-2">{item.type === 'event' ? 'Upcoming Event' : 'Latest Update'}</span>
              <h1 className="display-4 fw-bold text-white">{item.title}</h1>
              <p className="lead text-white">{item.type === 'event' ? `On ${new Date(item.date).toLocaleDateString()}` : ''}</p>
              <Link to={`/${item.type}s/${item.id}`} className="btn btn-lg btn-light">
                Know More
              </Link>
            </div>
          </div>
        ))}
      </div>
       <button className="carousel-control-prev" type="button" data-bs-target="#updatesCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#updatesCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default UpdatesSlider;