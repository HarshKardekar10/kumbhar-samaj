import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

const ProfileDetailPage = () => {
  const { id } = useParams(); // Get the profile ID from the URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/matrimony/profile/${id}`);
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (!profile) return <p className="text-center">Profile not found.</p>;

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

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4 text-center">
          <img 
            src={profile.profilePictureUrl || 'https://placehold.co/400x400/EFEFEF/AAAAAA&text=Photo'} 
            alt={profile.fullName} 
            className="img-fluid rounded-circle shadow-sm mb-3"
          />
          <h3 className="fw-bold">{profile.fullName}</h3>
          <p className="text-muted">{profile.profession}</p>
        </div>
        <div className="col-md-8">
          <h4>Profile Details</h4>
          <table className="table table-striped">
            <tbody>
              <tr><th>Age</th><td>{calculateAge(profile.dateOfBirth)} Years</td></tr>
              <tr><th>Gender</th><td>{profile.gender}</td></tr>
              <tr><th>Marital Status</th><td>{profile.maritalStatus}</td></tr>
              <tr><th>Height</th><td>{profile.height}</td></tr>
              <tr><th>Location</th><td>{`${profile.city}, ${profile.state}`}</td></tr>
              <tr><th>Gotra</th><td>{profile.gotra}</td></tr>
              <tr><th>Education</th><td>{profile.education}</td></tr>
              <tr><th>Annual Income</th><td>{profile.annualIncome}</td></tr>
              <tr><th>Contact Email</th><td>{profile.contactEmail}</td></tr>
            </tbody>
          </table>
          <div className="mt-4">
            <h5>About Me</h5>
            <p>{profile.aboutMe}</p>
          </div>
          <div className="mt-4">
            <h5>Family Details</h5>
            <p>{profile.familyDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;