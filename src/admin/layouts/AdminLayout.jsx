
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: "280px" }}
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
        </ul>
      </div>
      <main className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
