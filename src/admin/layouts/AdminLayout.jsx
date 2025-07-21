
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';
  const isUsers = location.pathname.startsWith('/users') || location.pathname.startsWith('/users');

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <nav
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark min-vh-100 w-100 w-md-280"
        style={{ maxWidth: "280px" }}
      >
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Admin Panel</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/dashboard" className={`nav-link ${isDashboard ? 'active' : 'text-white'}`} aria-current={isDashboard ? 'page' : undefined}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className={`nav-link ${isUsers ? 'active' : 'text-white'}`} aria-current={isUsers ? 'page' : undefined}>
              Users
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
