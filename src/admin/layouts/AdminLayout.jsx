
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <nav
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark min-vh-100 w-100 w-md-280"
        style={{ maxWidth: "280px" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Admin Panel</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="/app/users" className="nav-link text-white">
              Users
            </a>
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
