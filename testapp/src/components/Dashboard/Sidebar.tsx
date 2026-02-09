import React from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); // call backend logout
    } catch (error) {
      console.log("Logout API failed");
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed md:static z-50 top-0 left-0 h-screen w-64 bg-indigo-700 text-white p-6 flex flex-col justify-between transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:translate-x-0`}
      >
        {/* Top Section */}
        <div>
          <h3 className="text-xl font-bold mb-8">Coaching Portal</h3>

          <nav className="space-y-3">
            <NavLink
              to="/dashboard"
              className="block px-3 py-2 rounded hover:bg-indigo-600"
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/my-courses"
              className="block px-3 py-2 rounded hover:bg-indigo-600 hover:text-white"
            >
              My Courses
            </NavLink>

            <NavLink
              to="/attendance"
              className="block px-3 py-2 rounded hover:bg-indigo-600"
            >
              Attendance
            </NavLink>

            <NavLink
              to="/assignments"
              className="block px-3 py-2 rounded hover:bg-indigo-600"
            >
              Assignments
            </NavLink>

            <NavLink
              to="/fees"
              className="block px-3 py-2 rounded hover:bg-indigo-600"
            >
              Fees
            </NavLink>

          </nav>
        </div>

        {/* Bottom Section */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
