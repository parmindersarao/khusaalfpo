"use client";
import { useState } from "react";
import Sidebar, { Tab } from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import CustomerTable from "@/components/CustomerTable";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gradient-to-br from-green-200 to-green-700 min-h-screen p-2 md:p-4 gap-2 md:gap-4">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 bg-gray-50 rounded-2xl p-3 md:p-6 min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <StatsCards />
        {activeTab === "help" ? (
          <div className="bg-white rounded-2xl p-6 text-center text-gray-400 h-40 flex items-center justify-center">
            Help section coming soon.
          </div>
        ) : (
          <CustomerTable filter={activeTab} />
        )}
      </main>
    </div>
  );
}