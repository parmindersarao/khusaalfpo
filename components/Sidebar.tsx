"use client";
import { LayoutDashboard, Users, Clock, HelpCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type Tab = "all" | "active" | "pending" | "help";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

interface MenuItem {
  name: string;
  icon: LucideIcon;
  tab: Tab;
}

const menu: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, tab: "all" },
  { name: "Active Users", icon: Users, tab: "active" },
  { name: "Pending Users", icon: Clock, tab: "pending" },
  { name: "Help", icon: HelpCircle, tab: "help" },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-white rounded-2xl p-4 h-full">
      <h1 className="text-xl font-bold flex items-center gap-1 px-2 py-3">
        Khushaal FPO 
      </h1>
      <nav className="mt-4 flex flex-col gap-1">
        {menu.map((item) => (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm w-full text-left transition cursor-pointer ${
              activeTab === item.tab
                ? "bg-green-700 text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <item.icon size={18} />
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}