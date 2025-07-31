import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const CreateProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State for the form text fields
  const [formData, setFormData] = useState({
    fullName: '', gender: 'Male', dateOfBirth: '', height: '',
    maritalStatus: 'Never Married', gotra: '', city: '', state: '',
    education: '', profession: '', annualIncome: '', aboutMe: '',
    familyDetails: '', contactEmail: user?.email || '', profilePictureUrl: ''
  });
  
  // --- New state for the selected file ---
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Effect to pre-fill form if user is editing
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const { data } = await api.get('/matrimony/profile/me');
        if (data) {
          data.dateOfBirth = data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '';
          setFormData(data);
        }
      } catch (err) {
        console.log("No existing profile found, creating a new one.");
      }
    };
    fetchMyProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- New handler for file input change ---
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let finalProfileData = { ...formData };

    // --- Step 1: Upload image if a new one is selected ---
    if (selectedFile) {
      setUploading(true);
      const uploadFormData = new FormData();
      uploadFormData.append('profilePicture', selectedFile);
      
      try {
        const uploadRes = await api.post('/matrimony/profile/upload', uploadFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        // Update the profilePictureUrl with the path from the server
        finalProfileData.profilePictureUrl = uploadRes.data.filePath;
      } catch (err) {
        setError('Image upload failed. Please try again.');
        setLoading(false);
        setUploading(false);
        return; // Stop submission if upload fails
      }
      setUploading(false);
    }

    // --- Step 2: Submit the rest of the form data ---
    try {
      await api.post('/matrimony/profile', finalProfileData);
      alert('Profile saved successfully!');
      navigate('/matrimony');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">My Matrimony Profile</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {/* ... all your other form fields ... */}
        <div className="col-md-6"><input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="form-control" required /></div>
        <div className="col-md-6"><input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="form-control" required /></div>
        <div className="col-md-6"><select name="gender" value={formData.gender} onChange={handleChange} className="form-select"><option>Male</option><option>Female</option></select></div>
        <div className="col-md-6"><select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="form-select"><option>Never Married</option><option>Divorced</option><option>Widowed</option></select></div>
        <div className="col-md-6"><input name="height" value={formData.height} onChange={handleChange} placeholder="Height (e.g., 5ft 10in)" className="form-control" /></div>
        <div className="col-md-6"><input name="gotra" value={formData.gotra} onChange={handleChange} placeholder="Gotra" className="form-control" /></div>
        <div className="col-md-6"><input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="form-control" required /></div>
        <div className="col-md-6"><input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="form-control" required /></div>
        <div className="col-md-6"><input name="education" value={formData.education} onChange={handleChange} placeholder="Highest Education" className="form-control" /></div>
        <div className="col-md-6"><input name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" className="form-control" /></div>
        <div className="col-md-12"><input name="annualIncome" value={formData.annualIncome} onChange={handleChange} placeholder="Annual Income (e.g., 10-15 Lakhs)" className="form-control" /></div>
        <div className="col-md-12"><textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} placeholder="About Me" className="form-control" rows="3"></textarea></div>
        <div className="col-md-12"><textarea name="familyDetails" value={formData.familyDetails} onChange={handleChange} placeholder="Family Details" className="form-control" rows="3"></textarea></div>

        {/* --- Updated File Input --- */}
        <div className="col-md-12">
            <label htmlFor="profilePictureInput" className="form-label">Profile Picture</label>
            <input 
                type="file" 
                id="profilePictureInput"
                className="form-control"
                onChange={handleFileChange} 
            />
            {formData.profilePictureUrl && !selectedFile && (
                <small className="form-text text-muted">Current picture is saved. Upload a new one to replace it.</small>
            )}
        </div>
        
        {error && <div className="col-12 alert alert-danger">{error}</div>}
        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {uploading ? 'Uploading Image...' : (loading ? 'Saving Profile...' : 'Save Profile')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfilePage;