import React from "react";
import { Bell } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm opacity-90">
          Welcome Rahul (Admin)
        </p>
        <p className="text-xs opacity-80">
          Last login: 10:30 AM
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm bg-green-500 px-3 py-1 rounded-full">
          System Active
        </span>
        <Bell className="cursor-pointer" />
        <p className="text-sm">
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Header;