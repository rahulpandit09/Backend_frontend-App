import React from "react";

const subjects = [
  { name: "Physics", total: 40, present: 35 },
  { name: "Mathematics", total: 35, present: 28 },
  { name: "Chemistry", total: 45, present: 37 },
];

const monthlyData = [
  { month: "Jan", percent: 78 },
  { month: "Feb", percent: 82 },
  { month: "Mar", percent: 88 },
  { month: "Apr", percent: 91 },
];

const Attendance: React.FC = () => {
  const overall = 85;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">📅 Attendance Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Class 12 Science | Evening Batch
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-purple-600 text-white p-5 rounded-xl shadow-lg">
          <p className="text-sm">Overall Attendance</p>
          <h2 className="text-3xl font-bold">{overall}%</h2>
        </div>

        <div className="bg-green-600 text-white p-5 rounded-xl shadow-lg">
          <p className="text-sm">This Month</p>
          <h2 className="text-3xl font-bold">92%</h2>
        </div>

        <div className="bg-blue-600 text-white p-5 rounded-xl shadow-lg">
          <p className="text-sm">Total Classes</p>
          <h2 className="text-3xl font-bold">120</h2>
        </div>

        <div className="bg-red-500 text-white p-5 rounded-xl shadow-lg">
          <p className="text-sm">Missed Classes</p>
          <h2 className="text-3xl font-bold">18</h2>
        </div>
      </div>

      {/* Attendance Insight */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-3">📊 Attendance Insight</h2>

        {overall >= 75 ? (
          <p className="text-green-600 font-medium">
            Great job! Your attendance is above the required 75% 👏
          </p>
        ) : (
          <p className="text-red-600 font-medium">
            Warning! Your attendance is below required 75%.
          </p>
        )}
      </div>

      {/* Monthly Trend */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">
          📈 Monthly Attendance Trend
        </h2>

        <div className="space-y-4">
          {monthlyData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.month}</span>
                <span>{item.percent}%</span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-purple-600 h-3 rounded-full"
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Analytics */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">
          📚 Subject-wise Performance
        </h2>

        <div className="space-y-6">
          {subjects.map((subject, index) => {
            const percent = Math.round(
              (subject.present / subject.total) * 100
            );

            let barColor = "bg-green-500";
            if (percent < 75 && percent >= 60) barColor = "bg-yellow-500";
            if (percent < 60) barColor = "bg-red-500";

            return (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{subject.name}</span>
                  <span>{percent}%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className={`${barColor} h-3 rounded-full`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Records */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          🗓 Recent Attendance
        </h2>

        <ul className="space-y-3 text-sm">
          <li className="flex justify-between">
            <span>12 Sept - Physics</span>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">
              Present
            </span>
          </li>

          <li className="flex justify-between">
            <span>11 Sept - Maths</span>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">
              Present
            </span>
          </li>

          <li className="flex justify-between">
            <span>10 Sept - Chemistry</span>
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs">
              Absent
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Attendance;
