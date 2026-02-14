import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const StudentLayout: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    // <div className="flex min-h-screen bg-yellow-100">
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-8">Student Panel</h2>

        <nav className="space-y-4 flex-1">
          <Link to="/student" className="block hover:bg-blue-600 p-2 rounded">
            Dashboard
          </Link>

          <Link to="/student/courses" className="block hover:bg-blue-600 p-2 rounded">
            My Courses
          </Link>

          <Link to="/student/assignments" className="block hover:bg-blue-600 p-2 rounded">
            Assignments
          </Link>

          <Link to="/student/attendance" className="block hover:bg-blue-600 p-2 rounded">
            Attendance
          </Link>

          <Link to="/student/courseRegistration" className="block hover:bg-blue-600 p-2 rounded">
            Course Registration
          </Link>


        </nav>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 p-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      {/* <main className="flex-1 p-6"> */}
      <main className="flex-1 p-6 bg-gradient-to-br from-green-400 to-yellow-300">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
