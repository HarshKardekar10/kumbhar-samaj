import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';

// Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PostDetailPage from './pages/PostDetailPage';
import EventsPage from './pages/EventsPage';
import DonatePage from './pages/DonatePage';

// Matrimony Pages
import MatrimonyPage from './pages/MatrimonyPage';
import CreateProfilePage from './pages/CreateProfilePage';
import ProfileDetailPage from './pages/ProfileDetailPage';

// Admin Pages & Components
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManagePosts from './components/admin/ManagePosts';
import ManageEvents from './components/admin/ManageEvents';
import ContentForm from './components/admin/ContentForm';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            {/* Add a route for EventDetailPage here if you create it */}
            
            {/* --- Logged-in User Routes --- */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/donate" element={<DonatePage />} />

            {/* Matrimony Routes */}
            <Route path="/matrimony" element={<MatrimonyPage />} />
            <Route path="/matrimony/create" element={<CreateProfilePage />} />
            <Route path="/matrimony/profile/:id" element={<ProfileDetailPage />} />

            {/* --- Admin Routes (Protected) --- */}
            <Route path="/admin/dashboard" element={<AdminRoute />}>
              <Route path="" element={<AdminDashboardPage />}>
                {/* Nested Admin Routes for managing content */}
                <Route path="posts" element={<ManagePosts />} />
                <Route path="posts/new" element={<ContentForm type="post" />} />
                <Route path="posts/edit/:id" element={<ContentForm type="post" />} />
                
                <Route path="events" element={<ManageEvents />} />
                <Route path="events/new" element={<ContentForm type="event" />} />
                <Route path="events/edit/:id" element={<ContentForm type="event" />} />
              </Route>
            </Route>

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;