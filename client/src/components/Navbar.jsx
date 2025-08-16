import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  // We get both the 'user' and 'logout' function from the context
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // This function will be called when the logout button is clicked
  const handleLogout = () => {
    logout(); // This clears the user state and token
    navigate('/login'); // This redirects the user to the login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-theme shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Kumbhar Samaj</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Public Links */}
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/matrimony">Matrimony</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/events">Events</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/donate">Donate</Link></li>
            
            {user ? (
              // Logged In User Links
              <>
                {user.isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link fw-bold text-warning" to="/admin/dashboard">Admin Panel</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">My Dashboard</Link>
                </li>
                <li className="nav-item">
                  {/* This button now correctly calls the handleLogout function */}
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              // Guest User Links
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;