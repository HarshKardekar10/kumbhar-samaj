import React from 'react';
import { Link } from 'react-router-dom';

const MatrimonyCard = ({ profile }) => {
  
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // --- Construct the full image URL ---
  const imageUrl = profile.profilePictureUrl 
    ? `http://localhost:5000${profile.profilePictureUrl}` 
    : 'https://placehold.co/400x400/EFEFEF/AAAAAA&text=Photo';

  return (
    <div className="card h-100 shadow-sm text-center">
      <img 
        src={imageUrl} 
        className="card-img-top" 
        alt={profile.fullName}
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title fw-bold">{profile.fullName}</h5>
        <p className="card-text text-muted">
          {calculateAge(profile.dateOfBirth)} Years, {profile.profession}
        </p>
        <Link to={`/matrimony/profile/${profile.id}`} className="btn btn-outline-primary stretched-link">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default MatrimonyCard;