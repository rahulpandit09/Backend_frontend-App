import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Teacher {
    id: string;
    name: string;
    email: string;
    phone: string;
    status?: string;
    course?: string;
    batch?: string;
    students?: string;
}

const Teachers = () => {
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [batchFilter, setBatchFilter] = useState("");

    // Fetch Teachers from API
    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8000/admin/faculty-teachers"
            );

            setTeachers(res.data);

        } catch (error) {
            console.error("Error fetching teachers", error);
        }
    };

    const filteredTeachers = teachers.filter((t) => {
        const matchSearch =
            t.name?.toLowerCase().includes(search.toLowerCase());

        const matchStatus =
            !statusFilter || t.status === statusFilter;

        const matchCourse =
            !courseFilter || t.course === courseFilter;

        const matchBatch =
            !batchFilter || t.batch === batchFilter;

        return matchSearch && matchStatus && matchCourse && matchBatch;
    });

    return (
        <div className="w-full max-w-[1400px] mx-auto space-y-6">

            {/* Header */}
            <div className="bg-blue-700 text-white rounded-xl p-6 shadow-md mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold">Teachers</h1>
                    <p className="text-sm opacity-80 mt-1">
                        Manage teachers and course assignments
                    </p>
                </div>

                <button
                    onClick={() => navigate("/admin/teachers/assign")}
                    className="bg-white text-blue-700 font-medium px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
                >
                    + Assign Teacher
                </button>
            </div>

            <div className="max-w-6xl mx-auto space-y-6">

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">

                    {/* Total Teachers */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
                        <p className="text-sm opacity-80">Total Teachers</p>
                        <h2 className="text-3xl font-bold mt-2">{teachers.length}</h2>
                    </div>

                    {/* Active Teachers */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
                        <p className="text-sm opacity-80">Active Teachers</p>
                        <h2 className="text-3xl font-bold mt-2">
                            {teachers.filter(t => t.status === "Active").length}
                        </h2>
                    </div>

                    {/* Courses Assigned */}
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
                        <p className="text-sm opacity-80">Courses Assigned</p>
                        <h2 className="text-3xl font-bold mt-2">
                            {[...new Set(teachers.map(t => t.course).filter(Boolean))].length}
                        </h2>
                    </div>

                    {/* Batches */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
                        <p className="text-sm opacity-80">Batches</p>
                        <h2 className="text-3xl font-bold mt-2">
                            {[...new Set(teachers.map(t => t.batch).filter(Boolean))].length}
                        </h2>
                    </div>

                </div>

                {/* Search */}
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search teacher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-64"
                    />


                    {/* Filters Right Side */}
                    <div className="flex gap-3">

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        {/* Course Filter */}
                        <select
                            value={courseFilter}
                            onChange={(e) => setCourseFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="">All Courses</option>

                            {[...new Set(teachers.map(t => t.course).filter(Boolean))].map((course) => (
                                <option key={course} value={course}>
                                    {course}
                                </option>
                            ))}

                        </select>

                        {/* Batch Filter */}
                        <select
                            value={batchFilter}
                            onChange={(e) => setBatchFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="">All Batches</option>

                            {[...new Set(teachers.map(t => t.batch).filter(Boolean))].map((batch) => (
                                <option key={batch} value={batch}>
                                    {batch}
                                </option>
                            ))}

                        </select>
                    </div>

                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow">

                    <div className="max-h-96 overflow-y-auto">

                        <table className="w-full text-sm">

                            <thead className="bg-gray-50 border-b sticky top-0">
                                <tr className="text-gray-600">
                                    <th className="p-4 text-left">Teacher ID</th>
                                    <th className="p-4 text-left">Teacher</th>
                                    <th className="p-4 text-left">Phone</th>
                                    <th className="p-4 text-left">Course</th>
                                    <th className="p-4 text-left">Batch</th>
                                    <th className="p-4 text-left">Students</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTeachers.map((teacher) => (
                                    <tr key={teacher.id} className="border-b hover:bg-gray-50">

                                        <td className="p-4 font-semibold text-black">
                                            {`TEC-${String(teacher.id).padStart(3, "0")}`}
                                        </td>

                                        <td className="p-4">
                                            <div className="font-medium">{teacher.name}</div>
                                            <div className="text-xs text-gray-500">{teacher.email}</div>
                                        </td>

                                        <td className="p-4">{teacher.phone}</td>
                                        <td className="p-4">{teacher.course ?? "-"}</td>
                                        <td className="p-4">{teacher.batch ?? "-"}</td>
                                        <td className="p-4">{teacher.students ?? 0}</td>

                                        <td className="p-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs ${teacher.status === "Active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {teacher.status ?? "Inactive"}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <button
                                                onClick={() => navigate(`/admin/teachers/${teacher.id}`)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                View
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                </div>





            </div>
        </div>
    );
};

export default Teachers;
