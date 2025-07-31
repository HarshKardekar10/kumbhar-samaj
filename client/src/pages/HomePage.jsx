import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import ImageSlider from '../components/ImageSlider'; // 1. Import the new component
import './HomePage.css'; 

// FeatureCard component remains the same
const FeatureCard = ({ title, description, link, icon }) => (
  <div className="col-md-4 mb-4">
    <div className="card feature-card h-100 text-center shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="feature-icon mb-3">{icon}</div>
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="mt-auto">
          <Link to={link} className="btn btn-primary">Learn More</Link>
        </div>
      </div>
    </div>
  </div>
);


const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts');
        setPosts(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-page">
      {/* 1. Replace Hero Section with the new ImageSlider */}
      <ImageSlider />

      {/* Welcome Message Section */}
      <section className="container text-center my-5">
          <h1 className="display-5 fw-bold">Welcome to the Kumbhar Community Portal</h1>
          <p className="lead text-muted mt-3">Connecting our roots, empowering our future. Your digital home for community, culture, and connection.</p>
      </section>

      {/* 2. Core Features Section (No changes here) */}
      <section className="container my-5">
         <div className="row">
            <FeatureCard 
              title="Matrimony" 
              description="Find your life partner within our trusted community network."
              link="/matrimony"
              icon={<i className="fas fa-heart fa-2x"></i>}
            />
            <FeatureCard 
              title="Community Events" 
              description="Stay updated on cultural gatherings, annual meetings, and youth meetups."
              link="/events"
              icon={<i className="fas fa-calendar-alt fa-2x"></i>}
            />
            <FeatureCard 
              title="Support & Donate" 
              description="Contribute to community welfare, cultural preservation, and support initiatives."
              link="/donate"
              icon={<i className="fas fa-hand-holding-heart fa-2x"></i>}
            />
         </div>
      </section>

      {/* 3. Latest Updates Section (No changes here) */}
      <section className="latest-updates-section bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">From the Community Blog</h2>
          <div className="row">
            {loading ? (
              <p className="text-center">Loading updates...</p>
            ) : posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    {/* Make the post image clickable */}
                    <Link to={`/posts/${post.id}`}>
                      <img src={post.imageUrl} className="card-img-top" alt={post.title} style={{height: '200px', objectFit: 'cover'}}/>
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text text-muted">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        {post.content.substring(0, 100)}...
                      </p>
                      <Link to={`/posts/${post.id}`} className="btn btn-outline-primary">Read More</Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No recent updates available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
