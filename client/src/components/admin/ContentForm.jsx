import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';

const ContentForm = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  
  // State for the selected file
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchContent = async () => {
        try {
          const { data } = await api.get(`/${type}s/${id}`);
          // Format date for event forms
          if (type === 'event' && data.date) {
            data.date = data.date.split('T')[0];
          }
          setFormData(data);
        } catch (error) {
          console.error(`Failed to fetch ${type}`, error);
        }
      };
      fetchContent();
    }
  }, [id, isEditing, type]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let finalData = { ...formData };

    // --- Step 1: Upload image if a new one is selected ---
    if (selectedFile) {
      setUploading(true);
      const uploadFormData = new FormData();
      // The key 'postImage' must match the one in the backend route
      uploadFormData.append(`${type}Image`, selectedFile); 
      
      try {
        const uploadRes = await api.post(`/${type}s/upload`, uploadFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        // Update the imageUrl with the path from the server
        finalData.imageUrl = uploadRes.data.filePath;
      } catch (err) {
        alert('Image upload failed. Please try again.');
        setLoading(false);
        setUploading(false);
        return; // Stop submission if upload fails
      }
      setUploading(false);
    }

    // --- Step 2: Submit the rest of the form data ---
    const apiCall = isEditing 
      ? api.put(`/${type}s/${id}`, finalData)
      : api.post(`/${type}s`, finalData);
      
    try {
      await apiCall;
      alert(`'${type}' saved successfully!`);
      navigate(`/admin/dashboard/${type}s`);
    } catch (error) {
      alert(`Failed to save '${type}'.`);
    } finally {
      setLoading(false);
    }
  };

  const fields = type === 'post' 
    ? ['title', 'content'] // Remove imageUrl from here
    : ['title', 'description', 'date', 'location']; // Remove imageUrl from here

  return (
    <div>
      <h3 className="text-capitalize">{isEditing ? `Edit ${type}` : `New ${type}`}</h3>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input 
              type={field === 'date' ? 'date' : 'text'}
              name={field}
              value={formData[field] || ''}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}

        {/* --- New File Input Section --- */}
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input 
            type="file" 
            className="form-control"
            onChange={handleFileChange} 
          />
          {isEditing && formData.imageUrl && !selectedFile && (
            <small className="d-block mt-2">
              Current image: <a href={`http://localhost:5000${formData.imageUrl}`} target="_blank" rel="noopener noreferrer">View</a>
            </small>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {uploading ? 'Uploading Image...' : (loading ? 'Saving...' : 'Save')}
        </button>
      </form>
    </div>
  );
};

export default ContentForm;