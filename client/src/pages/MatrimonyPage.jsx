import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import MatrimonyCard from '../components/MatrimonyCard'; // We will update this component next

const MatrimonyPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await api.get('/matrimony/profiles');
        setProfiles(data);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // A simple check to see if the logged-in user has a profile
  const userHasProfile = profiles.some(p => p.UserId === user?.id);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Matrimony Profiles</h2>
        {user && !userHasProfile && (
          <Link to="/matrimony/create" className="btn btn-primary">
            Create Your Profile
          </Link>
        )}
         {user && userHasProfile && (
          <Link to="/matrimony/create" className="btn btn-secondary">
            Update Your Profile
          </Link>
        )}
      </div>

      {loading ? (
        <p className="text-center">Loading profiles...</p>
      ) : profiles.length > 0 ? (
        <div className="row">
          {profiles.map(profile => (
            <div key={profile.id} className="col-md-4 col-lg-3 mb-4">
              <MatrimonyCard profile={profile} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p>No matrimony profiles have been created yet.</p>
        </div>
      )}
    </div>
  );
};

export default MatrimonyPage;
