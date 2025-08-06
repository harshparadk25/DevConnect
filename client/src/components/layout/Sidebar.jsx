import { useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  
  useEffect(() => {
    if (window.innerWidth < 768 && isOpen) {
      toggleSidebar();
    }
  }, [location.pathname]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        toggleSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        toggleSidebar();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition ${
      isActive ? "bg-gray-100 font-semibold text-blue-600" : "text-gray-700"
    }`;

  return (
    <aside
      ref={sidebarRef}
      className={`fixed z-50 md:static top-0 left-0 h-full w-64 bg-white border-r shadow-md p-4 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      

      <nav className="space-y-2">
        <NavLink to="/" className={linkClasses}>
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
        <NavLink to="/all-projects" className={linkClasses}>
          <FolderKanban className="w-5 h-5" />
          All Projects
        </NavLink>
        <NavLink to="/my-projects" className={linkClasses}>
          <FolderKanban className="w-5 h-5" />
          My Projects
        </NavLink>

        <NavLink to="/add-project" className={linkClasses}>
          <PlusCircle className="w-5 h-5" />
          Add Project
        </NavLink>
        <NavLink to="/profile" className={linkClasses}>
          <User className="w-5 h-5" />
          Profile
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-left px-4 py-2 rounded hover:bg-gray-200 text-red-600"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
