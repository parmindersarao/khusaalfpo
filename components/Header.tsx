"use client";
import { LogOut } from "lucide-react";

export default function Header() {
  const handleLogout = () => {
    // Abhi ke liye simple alert/redirect — baad mein real auth logic yahan lagega
    alert("Logged out!");
    // Jab real backend aayega: router.push("/login") ya auth clear karna
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">
        Hello Sir <span>👋</span>
      </h2>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}