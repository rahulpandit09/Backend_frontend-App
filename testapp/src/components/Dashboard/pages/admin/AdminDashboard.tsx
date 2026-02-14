import React from "react";

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: "Total Students", value: 120, color: "bg-blue-500" },
    { title: "Total Teachers", value: 15, color: "bg-green-500" },
    { title: "Total Courses", value: 8, color: "bg-purple-500" },
    { title: "Pending Fees", value: "₹45,000", color: "bg-red-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} text-white p-6 rounded-xl shadow`}
          >
            <h4 className="text-sm opacity-80">{stat.title}</h4>
            <h2 className="text-2xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
