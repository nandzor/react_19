
import { Outlet, NavLink, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <nav
        className="flex flex-col flex-shrink-0 p-3 text-white bg-gray-900 min-h-screen w-full md:w-72"
        style={{ maxWidth: "280px" }}
      >
        <Link
          to="/"
          className="flex items-center mb-3 md:mb-0 md:mr-auto text-white no-underline"
        >
          <span className="text-xl">Admin Panel</span>
        </Link>
        <hr className="border-gray-700" />
        <ul className="space-y-2 mb-auto">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              end
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) => `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="flex-grow p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
