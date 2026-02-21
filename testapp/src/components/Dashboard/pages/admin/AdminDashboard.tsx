// // import React from "react";
// // import { useEffect, useState } from "react";
// // import {
// //   Users,
// //   DollarSign,
// //   UserPlus,
// //   BookOpen,
// //   FileText,
// //   Bell,
// // } from "lucide-react";

// // import { useNavigate } from "react-router-dom";
// // import {
// //   BarChart,
// //   Bar,
// //   LineChart,
// //   Line,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from "recharts";

// // import StatCard from "./dashboard/StatCard";
// // import ActionCard from "./dashboard/ActionCard";
// // import RecentStudentsTable from "./dashboard/RecentStudentsTable";

// // const AdminDashboard: React.FC = () => {
// //   const navigate = useNavigate();

// //   const stats = {
// //     totalStudents: 120,
// //     paidStudents: 90,
// //     pendingStudents: 20,
// //     unpaidStudents: 10,
// //     totalRevenue: 450000,
// //     monthRevenue: 52000,
// //     todayRevenue: 3000,
// //     pendingAmount: 70000,
// //   };

// //   /* ===== CHART DATA ===== */

// //   const revenueData = [
// //     { month: "Jan", revenue: 40000 },
// //     { month: "Feb", revenue: 52000 },
// //     { month: "Mar", revenue: 48000 },
// //     { month: "Apr", revenue: 61000 },
// //     { month: "May", revenue: 53000 },
// //     { month: "Jun", revenue: 72000 },
// //   ];

// //   const studentGrowth = [
// //     { month: "Jan", students: 20 },
// //     { month: "Feb", students: 35 },
// //     { month: "Mar", students: 50 },
// //     { month: "Apr", students: 65 },
// //     { month: "May", students: 80 },
// //     { month: "Jun", students: 120 },
// //   ];

// //   const courseData = [
// //     { name: "Physics", value: 40 },
// //     { name: "Math", value: 30 },
// //     { name: "Chemistry", value: 20 },
// //     { name: "Biology", value: 10 },
// //   ];
  

// //   const COLORS = ["#3b82f6", "#22c55e", "#facc15", "#ef4444"];

// //   return (
// //     <div className="p-6 bg-gray-100 min-h-screen space-y-6">

// //       {/* ================= HEADER ================= */}
// //       <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
// //         <div>
// //           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
// //           <p className="text-sm opacity-90">
// //             Welcome Rahul (Admin)
// //           </p>
// //           <p className="text-xs opacity-80">
// //             Last login: 10:30 AM
// //           </p>
// //         </div>

// //         <div className="flex items-center gap-4">
// //           <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
// //             System Active
// //           </span>
// //           <Bell className="cursor-pointer" />
// //           <p>{new Date().toLocaleDateString()}</p>
// //         </div>
// //       </div>

// //       {/* ================= SMART ALERTS ================= */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //         <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
// //           🔴 5 Overdue Students
// //         </div>
// //         <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
// //           🟡 12 Pending Payments
// //         </div>
// //         <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
// //           🟢 3 New Admissions Today
// //         </div>
// //       </div>

// //       {/* ================= STUDENT STATS ================= */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         <div onClick={() => navigate("/admin/manage-students")}>
// //           <StatCard
// //             title="Total Students"
// //             value={stats.totalStudents}
// //             icon={<Users size={20} />}
// //             bg="bg-blue-50"
// //             border="border-blue-500"
// //           />
// //         </div>

// //         <div onClick={() => navigate("/admin/manage-students?status=paid")}>
// //           <StatCard
// //             title="Paid Students"
// //             value={stats.paidStudents}
// //             icon={<Users size={20} />}
// //             bg="bg-green-50"
// //             border="border-green-500"
// //           />
// //         </div>

// //         <div onClick={() => navigate("/admin/manage-students?status=pending")}>
// //           <StatCard
// //             title="Pending Students"
// //             value={stats.pendingStudents}
// //             icon={<Users size={20} />}
// //             bg="bg-yellow-50"
// //             border="border-yellow-500"
// //           />
// //         </div>

// //         <StatCard
// //           title="Unpaid Students"
// //           value={stats.unpaidStudents}
// //           icon={<Users size={20} />}
// //           bg="bg-red-50"
// //           border="border-red-500"
// //         />
// //       </div>

// //       {/* ================= REVENUE STATS ================= */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         <StatCard
// //           title="Total Revenue"
// //           value={`₹${stats.totalRevenue}`}
// //           icon={<DollarSign size={20} />}
// //           bg="bg-green-50"
// //           border="border-green-600"
// //         />
// //         <StatCard
// //           title="This Month Revenue"
// //           value={`₹${stats.monthRevenue}`}
// //           icon={<DollarSign size={20} />}
// //           bg="bg-blue-50"
// //           border="border-blue-600"
// //         />
// //         <StatCard
// //           title="Today Revenue"
// //           value={`₹${stats.todayRevenue}`}
// //           icon={<DollarSign size={20} />}
// //           bg="bg-purple-50"
// //           border="border-purple-600"
// //         />
// //         <StatCard
// //           title="Pending Amount"
// //           value={`₹${stats.pendingAmount}`}
// //           icon={<DollarSign size={20} />}
// //           bg="bg-red-50"
// //           border="border-red-600"
// //         />
// //       </div>

// //       {/* ================= CHARTS SECTION ================= */}
// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

// //         {/* Revenue Bar */}
// //         <div className="bg-white p-5 rounded-2xl shadow-sm">
// //           <h2 className="font-semibold mb-3">Monthly Revenue</h2>
// //           <ResponsiveContainer width="100%" height={250}>
// //             <BarChart data={revenueData}>
// //               <XAxis dataKey="month" />
// //               <YAxis />
// //               <Tooltip />
// //               <Bar dataKey="revenue" fill="#3b82f6" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>

// //         {/* Student Growth */}
// //         <div className="bg-white p-5 rounded-2xl shadow-sm">
// //           <h2 className="font-semibold mb-3">Student Growth</h2>
// //           <ResponsiveContainer width="100%" height={250}>
// //             <LineChart data={studentGrowth}>
// //               <XAxis dataKey="month" />
// //               <YAxis />
// //               <Tooltip />
// //               <Line type="monotone" dataKey="students" stroke="#22c55e" />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>

// //         {/* Course Pie */}
// //         <div className="bg-white p-5 rounded-2xl shadow-sm">
// //           <h2 className="font-semibold mb-3">Course Distribution</h2>
// //           <ResponsiveContainer width="100%" height={250}>
// //             <PieChart>
// //               <Pie data={courseData} dataKey="value" outerRadius={80}>
// //                 {courseData.map((_entry, index) => (
// //                   <Cell key={index} fill={COLORS[index]} />
// //                 ))}
// //               </Pie>
// //               <Tooltip />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>

// //       {/* ================= QUICK ACTIONS ================= */}
// //       <div>
// //         <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //           <ActionCard title="Add Student" icon={<UserPlus size={22} />} />
// //           <ActionCard title="Manage Courses" icon={<BookOpen size={22} />} />
// //           <ActionCard title="Update Fees" icon={<DollarSign size={22} />} />
// //           <ActionCard title="View Reports" icon={<FileText size={22} />} />
// //         </div>
// //       </div>

// //       <RecentStudentsTable />

// //     </div>
// //   );
// // };

// // export default AdminDashboard;





// import React, { useEffect, useState } from "react";
// import {
//   Users, DollarSign, UserPlus, BookOpen, FileText, Bell,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import {
//   BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
//   XAxis, YAxis, Tooltip, ResponsiveContainer,
// } from "recharts";
// import StatCard from "./dashboard/StatCard";
// import ActionCard from "./dashboard/ActionCard";
// import RecentStudentsTable from "./dashboard/RecentStudentsTable";

// const BASE_URL = "http://localhost:8000";

// const AdminDashboard: React.FC = () => {
//   const navigate = useNavigate();

//   // ===== STATE =====
//   const [stats, setStats] = useState({
//     total_students: 0,
//     paid_students: 0,
//     pending_students: 0,
//     total_revenue: 0,
//   });
//   const [revenueData, setRevenueData] = useState<{ month: string; revenue: number }[]>([]);
//   const [studentGrowth, setStudentGrowth] = useState<{ month: string; students: number }[]>([]);
//   interface Student {
//   id: number;
//   name: string;
//   course_id: number;
//   pending_amount: number;
//   created_at: string | null;
// }

// const [recentStudents, setRecentStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ===== FETCH ALL APIs =====
//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [summaryRes, revenueRes, growthRes, studentsRes] = await Promise.all([
//           fetch(`${BASE_URL}/admin/dashboard/summary`),
//           fetch(`${BASE_URL}/admin/dashboard/monthly-revenue`),
//           fetch(`${BASE_URL}/admin/dashboard/student-growth`),
//           fetch(`${BASE_URL}/admin/dashboard/recent-students`),
//         ]);

//         const summary = await summaryRes.json();
//         const revenue = await revenueRes.json();
//         const growth = await growthRes.json();
//         const students = await studentsRes.json();

//         setStats(summary);

//         // Replace null months with "N/A"
//         setRevenueData(revenue.map((r: any) => ({ ...r, month: r.month ?? "N/A" })));
//         setStudentGrowth(growth.map((g: any) => ({ ...g, month: g.month ?? "N/A" })));
//         setRecentStudents(students);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, []);

//   const courseData = [
//     { name: "Physics", value: 40 },
//     { name: "Math", value: 30 },
//     { name: "Chemistry", value: 20 },
//     { name: "Biology", value: 10 },
//   ];
//   const COLORS = ["#3b82f6", "#22c55e", "#facc15", "#ef4444"];

//   if (loading) return <div className="p-10 text-center text-gray-500">Loading dashboard...</div>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen space-y-6">

//       {/* HEADER */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//           <p className="text-sm opacity-90">Welcome Rahul (Admin)</p>
//           <p className="text-xs opacity-80">Last login: 10:30 AM</p>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="bg-green-500 px-3 py-1 rounded-full text-sm">System Active</span>
//           <Bell className="cursor-pointer" />
//           <p>{new Date().toLocaleDateString()}</p>
//         </div>
//       </div>

//       {/* SMART ALERTS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-red-50 border border-red-200 p-4 rounded-xl">🔴 5 Overdue Students</div>
//         <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">🟡 12 Pending Payments</div>
//         <div className="bg-green-50 border border-green-200 p-4 rounded-xl">🟢 3 New Admissions Today</div>
//       </div>

//       {/* STUDENT STATS — from /summary */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div onClick={() => navigate("/admin/manage-students")}>
//           <StatCard title="Total Students" value={stats.total_students} icon={<Users size={20} />} bg="bg-blue-50" border="border-blue-500" />
//         </div>
//         <div onClick={() => navigate("/admin/manage-students?status=paid")}>
//           <StatCard title="Paid Students" value={stats.paid_students} icon={<Users size={20} />} bg="bg-green-50" border="border-green-500" />
//         </div>
//         <div onClick={() => navigate("/admin/manage-students?status=pending")}>
//           <StatCard title="Pending Students" value={stats.pending_students} icon={<Users size={20} />} bg="bg-yellow-50" border="border-yellow-500" />
//         </div>
//         <StatCard
//           title="Unpaid Students"
//           value={0}
//           icon={<Users size={20} />} bg="bg-red-50" border="border-red-500"
//         />
//       </div>

//       {/* REVENUE STATS — from /summary */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <StatCard title="Total Revenue" value={`₹${stats.total_revenue}`} icon={<DollarSign size={20} />} bg="bg-green-50" border="border-green-600" />
//         <StatCard title="This Month Revenue" value={`₹${revenueData.at(-1)?.revenue ?? 0}`} icon={<DollarSign size={20} />} bg="bg-blue-50" border="border-blue-600" />
//         <StatCard title="Today Revenue" value="₹0" icon={<DollarSign size={20} />} bg="bg-purple-50" border="border-purple-600" />
//         <StatCard
//           title="Pending Amount"
//           value={`₹${recentStudents.reduce((sum, s) => sum + (s.pending_amount ?? 0), 0)}`}
//           icon={<DollarSign size={20} />} bg="bg-red-50" border="border-red-600"
//         />
//       </div>

//       {/* CHARTS */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <h2 className="font-semibold mb-3">Monthly Revenue</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={revenueData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="revenue" fill="#3b82f6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <h2 className="font-semibold mb-3">Student Growth</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={studentGrowth}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="students" stroke="#22c55e" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <h2 className="font-semibold mb-3">Course Distribution</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={courseData} dataKey="value" outerRadius={80}>
//                 {courseData.map((_entry, index) => (
//                   <Cell key={index} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* QUICK ACTIONS */}
//       <div>
//         <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <ActionCard title="Add Student" icon={<UserPlus size={22} />} />
//           <ActionCard title="Manage Courses" icon={<BookOpen size={22} />} />
//           <ActionCard title="Update Fees" icon={<DollarSign size={22} />} />
//           <ActionCard title="View Reports" icon={<FileText size={22} />} />
//         </div>
//       </div>

//       {/* RECENT STUDENTS — pass live data */}
//       <RecentStudentsTable students={recentStudents} />

//     </div>
//   );
// };

// export default AdminDashboard;






import React, { useEffect, useState } from "react";
import {
  Users,
  DollarSign,
  UserPlus,
  BookOpen,
  FileText,
  Bell,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import StatCard from "./dashboard/StatCard";
import ActionCard from "./dashboard/ActionCard";
import RecentStudentsTable from "./dashboard/RecentStudentsTable";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [stats, setStats] = useState({
    total_students: 0,
    paid_students: 0,
    pending_students: 0,
    total_revenue: 0,
  });

  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [studentGrowth, setStudentGrowth] = useState<any[]>([]);

  /* ================= FETCH SUMMARY ================= */

  useEffect(() => {
    fetch("http://localhost:8000/admin/dashboard/summary")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:8000/admin/dashboard/monthly-revenue")
      .then((res) => res.json())
      .then((data) => setRevenueData(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:8000/admin/dashboard/student-growth")
      .then((res) => res.json())
      .then((data) => setStudentGrowth(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm opacity-90">Welcome Rahul (Admin)</p>
          <p className="text-xs opacity-80">Last login: 10:30 AM</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
            System Active
          </span>
          <Bell className="cursor-pointer" />
          <p>{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* ================= STUDENT STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div onClick={() => navigate("/admin/manage-students")}>
          <StatCard
            title="Total Students"
            value={stats.total_students}
            icon={<Users size={20} />}
            bg="bg-blue-50"
            border="border-blue-500"
          />
        </div>

        <StatCard
          title="Paid Students"
          value={stats.paid_students}
          icon={<Users size={20} />}
          bg="bg-green-50"
          border="border-green-500"
        />

        <StatCard
          title="Pending Students"
          value={stats.pending_students}
          icon={<Users size={20} />}
          bg="bg-yellow-50"
          border="border-yellow-500"
        />

        <StatCard
          title="Total Revenue"
          value={`₹${stats.total_revenue}`}
          icon={<DollarSign size={20} />}
          bg="bg-green-50"
          border="border-green-600"
        />

      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-3">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Student Growth Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-3">Student Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={studentGrowth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ActionCard title="Add Student" icon={<UserPlus size={22} />} />
          <ActionCard title="Manage Courses" icon={<BookOpen size={22} />} />
          <ActionCard title="Update Fees" icon={<DollarSign size={22} />} />
          <ActionCard title="View Reports" icon={<FileText size={22} />} />
        </div>
      </div>

      <RecentStudentsTable />

    </div>
  );
};

export default AdminDashboard;