import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is included

const ImageSlider = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts');
        // Filter for posts that might have a unique image and take the top 5
        const postsWithImages = data.filter(p => p.imageUrl).slice(0, 5);
        setPosts(postsWithImages);
      } catch (error) {
        console.error("Failed to fetch posts for slider:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading Latest Updates...</div>;
  }

  if (posts.length === 0) {
    return null; // Don't render the slider if there are no posts with images
  }

  return (
    <div id="latestUpdatesCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {posts.map((post, index) => (
          <button
            key={post.id}
            type="button"
            data-bs-target="#latestUpdatesCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {posts.map((post, index) => (
          <div key={post.id} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="5000">
            <img src={post.imageUrl} className="d-block w-100" alt={post.title} style={{ height: '50vh', objectFit: 'cover' }} />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
              <h5 className="fw-bold">{post.title}</h5>
              <Link to={`/posts/${post.id}`} className="btn btn-sm btn-primary">Read More</Link>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#latestUpdatesCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#latestUpdatesCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ImageSlider;