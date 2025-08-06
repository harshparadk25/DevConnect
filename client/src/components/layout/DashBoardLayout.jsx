import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <TopBar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet /> {/* 👈 This renders the matched nested route */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
