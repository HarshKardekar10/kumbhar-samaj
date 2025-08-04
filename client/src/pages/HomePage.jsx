import React from 'react';
    import { Link } from 'react-router-dom';
    import UpdatesSlider from '../components/UpdatesSlider'; // Import the new slider

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
      return (
        <div>
          <UpdatesSlider />
          <section className="container my-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold">A United Community Platform</h2>
                <p className="lead text-muted">Explore our services dedicated to strengthening our community bonds.</p>
            </div>
             <div className="row">
                <FeatureCard 
                  title="Matrimony" 
                  description="Find your life partner within our trusted community network."
                  link="/matrimony"
                  icon={<i className="fas fa-heart fa-2x"></i>}
                />
                <FeatureCard 
                  title="All Events" 
                  description="View a full calendar of cultural gatherings, meetings, and youth meetups."
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
        </div>
      );
    };

    export default HomePage;
    