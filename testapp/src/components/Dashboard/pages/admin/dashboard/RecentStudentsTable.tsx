import React, { useEffect, useState } from "react";

interface Student {
  id: number;
  name: string;
  course_id: number;
  pending_amount: number;
  created_at: string;
}

const RecentStudentsTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/admin/dashboard/recent-students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Students</h2>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-600 bg-gray-50">
                <th className="py-3 px-2 text-left">ID</th>
                <th className="py-3 px-2 text-left">Name</th>
                <th className="py-3 px-2 text-left">Course</th>
                <th className="py-3 px-2 text-left">Pending</th>
                <th className="py-3 px-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No recent students found
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">STU-{student.id}</td>
                    <td className="py-3 px-2">{student.name}</td>
                    <td className="py-3 px-2">
                      Course {student.course_id}
                    </td>
                    <td className="py-3 px-2">
                      ₹{student.pending_amount}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          student.pending_amount > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {student.pending_amount > 0
                          ? "Pending"
                          : "Paid"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentStudentsTable;