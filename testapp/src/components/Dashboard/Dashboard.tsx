import React from "react";

const Dashboard: React.FC = () => {
  const stats = [
    { title: "Total Courses", value: "5", color: "bg-indigo-600" },
    { title: "Attendance", value: "85%", color: "bg-green-600" },
    { title: "Pending Assignments", value: "2", color: "bg-orange-500" },
    { title: "Fees Status", value: "Paid", color: "bg-cyan-600" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, Rahul 
        </h2>
        <span className="text-gray-500 mt-2 md:mt-0">
          Class 12 Science | Evening Batch
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} text-white p-5 rounded-xl shadow-lg`}
          >
            <h6 className="text-sm opacity-80">{stat.title}</h6>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Announcements */}
        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-lg font-semibold mb-4">
            Recent Announcements
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li>Physics test on Friday</li>
            <li>New Chemistry notes uploaded</li>
            <li>Holiday on Monday</li>
          </ul>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-xl shadow p-5">
          <h4 className="text-lg font-semibold mb-4">
            Upcoming Classes
          </h4>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-2">Subject</th>
                <th className="pb-2">Time</th>
                <th className="pb-2">Mode</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="py-2">Physics</td>
                <td>5:00 PM</td>
                <td>Offline</td>
              </tr>
              <tr>
                <td className="py-2">Maths</td>
                <td>6:30 PM</td>
                <td>Online</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
