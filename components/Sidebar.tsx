"use client";
import { LayoutDashboard, Users, Clock, HelpCircle, X } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type Tab = "all" | "active" | "pending" | "help";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  icon: LucideIcon;
  tab: Tab;
}

const menu: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, tab: "all" },
  { name: "Registered Users", icon: Users, tab: "active" },
  { name: "Pending Users", icon: Clock, tab: "pending" },
  { name: "Help", icon: HelpCircle, tab: "help" },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay — background dark hota hai jab sidebar khula ho */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 h-full md:h-auto z-50
          w-64 bg-white rounded-none md:rounded-2xl p-4
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-2 py-3">
          <h1 className="text-xl font-bold flex items-center gap-1">
            Dashboard 
          </h1>
          {/* Close button sirf mobile pe dikhega */}
          <button onClick={onClose} className="md:hidden text-gray-400 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 flex flex-col gap-1">
          {menu.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                setActiveTab(item.tab);
                onClose(); // mobile pe select karte hi sidebar band ho jaye
              }}
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
    </>
  );
}