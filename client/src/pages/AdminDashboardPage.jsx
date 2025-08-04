import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminDashboardPage = () => {
  const location = useLocation();

  return (
    <div className="container-fluid my-5">
      <div className="row">
        {/* Admin Sidebar Navigation */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="position-sticky pt-3">
            <h4 className="sidebar-heading px-3 mt-4 mb-1 text-muted">Management</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname.endsWith('posts') ? 'active' : ''}`} 
                  to="/admin/dashboard/posts"
                >
                  Manage Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname.endsWith('events') ? 'active' : ''}`} 
                  to="/admin/dashboard/events"
                >
                  Manage Events
                </Link>
              </li>
              {/* Add more links here later, e.g., for users or matrimony profiles */}
            </ul>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Admin Dashboard</h1>
          </div>
          {/* The nested routes will be rendered here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;