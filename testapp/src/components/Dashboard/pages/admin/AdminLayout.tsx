import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-indigo-700 text-white flex flex-col p-5">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

                <nav className="space-y-4 flex-1">
                    <Link to="/admin" className="block hover:bg-indigo-600 p-2 rounded">
                        Dashboard
                    </Link>
                    <Link to="/admin/AdminManageStudents" className="block hover:bg-indigo-600 p-2 rounded">
                      Manage Students
                    </Link>
                    <Link to="/admin/teachers" className="block hover:bg-indigo-600 p-2 rounded">
                        Teachers
                    </Link>
                    <Link to="/admin/courses" className="block hover:bg-indigo-600 p-2 rounded">
                        Add Courses
                    </Link>
                    <Link to="/admin/courses" className="block hover:bg-indigo-600 p-2 rounded">
                        Batches
                    </Link>
                    <Link to="/admin/fees" className="block hover:bg-indigo-600 p-2 rounded">
                        Update Fees
                    </Link>
                    <Link to="/admin/fees" className="block hover:bg-indigo-600 p-2 rounded">
                        Reports
                    </Link>

                    <Link
                        to="/admin/create-teacher"
                        className="block hover:bg-indigo-600 p-2 rounded"
                    >
                       + Add Teacher
                    </Link>

                    <Link
                        to="/admin/create-student"
                        className="block hover:bg-indigo-600 p-2 rounded"
                    >
                        + Add Student
                    </Link>


                </nav>

                <button
                    onClick={logout}
                    className="mt-6 bg-red-500 hover:bg-red-600 p-2 rounded"
                >
                    Logout
                </button>
            </aside>

            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
