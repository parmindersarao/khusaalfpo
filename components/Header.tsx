"use client";
import { useEffect, useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.username) setUsername(data.username);
      })
      .catch(() => setUsername(""));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden text-gray-600 cursor-pointer">
          <Menu size={24} />
        </button>
        <h2 className="text-xl md:text-2xl font-semibold">
          Welcome {username || "Admin"} 
        </h2>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition cursor-pointer"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}