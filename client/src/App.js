    import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    
    // Components
    import Navbar from './components/Navbar';
    import Footer from './components/Footer';
    import AdminRoute from './components/AdminRoute';

    // Pages
    import HomePage from './pages/HomePage';
    import AboutPage from './pages/AboutPage';
    import MatrimonyPage from './pages/MatrimonyPage';
    import CreateProfilePage from './pages/CreateProfilePage';
    import ProfileDetailPage from './pages/ProfileDetailPage';
    import DonatePage from './pages/DonatePage';
    import EventsPage from './pages/EventsPage';
    import LoginPage from './pages/LoginPage';
    import RegisterPage from './pages/RegisterPage';
    import DashboardPage from './pages/DashboardPage';
    import PostDetailPage from './pages/PostDetailPage';

    // Admin Pages
    import AdminDashboardPage from './pages/AdminDashboardPage';
    // We will create these components in the next step
    // import ManagePosts from './components/admin/ManagePosts'; 
    // import ManageEvents from './components/admin/ManageEvents';

    const App = () => {
      return (
        <Router>
          <Navbar />
          <div className="container mt-4" style={{minHeight: '70vh'}}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />
              
              {/* User Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/matrimony" element={<MatrimonyPage />} />
              <Route path="/matrimony/create" element={<CreateProfilePage />} />
              <Route path="/matrimony/profile/:id" element={<ProfileDetailPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/donate" element={<DonatePage />} />

              {/* --- Admin Routes --- */}
              <Route path="/admin/dashboard" element={<AdminRoute />}>
                <Route path="" element={<AdminDashboardPage />}>
                  {/* Default view or add specific components */}
                  {/* <Route path="posts" element={<ManagePosts />} /> */}
                  {/* <Route path="events" element={<ManageEvents />} /> */}
                </Route>
              </Route>

            </Routes>
          </div>
          <Footer />
        </Router>
      );
    };

    export default App;