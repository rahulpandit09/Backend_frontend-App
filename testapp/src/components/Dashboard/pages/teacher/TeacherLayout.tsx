import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const TeacherLayout: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Teacher Panel</h2>

        <nav className="space-y-3 flex-1">
          <Link to="/teacher" className="block hover:bg-green-600 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/teacher/assignments" className="block hover:bg-green-600 p-2 rounded">
            Assignments
          </Link>
          <Link to="/teacher/notes" className="block hover:bg-green-600 p-2 rounded">
            Upload Notes
          </Link>
          <Link to="/teacher/attendance" className="block hover:bg-green-600 p-2 rounded">
            Attendance
          </Link>
          <Link to="/teacher/students" className="block hover:bg-green-600 p-2 rounded">
            Student List
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-6 bg-red-500 hover:bg-red-600 p-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherLayout;
