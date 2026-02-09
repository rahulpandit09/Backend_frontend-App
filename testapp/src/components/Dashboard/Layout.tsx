import React, { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1">
        
        {/* Top Navbar */}
        <div className="bg-white shadow p-4 flex items-center md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 text-2xl"
          >
            ☰
          </button>
          <h2 className="ml-4 font-semibold">Dashboard</h2>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Layout;
