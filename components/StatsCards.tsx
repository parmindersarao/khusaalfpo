import { Users, User, Monitor } from "lucide-react";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-full"><Users className="text-green-600" /></div>
        <div>
          <p className="text-2xl font-bold">5,423</p>
          <p className="text-xs text-green-600">↑ 16% this month</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-full"><User className="text-green-600" /></div>
        <div>
          <p className="text-2xl font-bold">1,893</p>
          <p className="text-xs text-red-500">↓ 1% this month</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-full"><Monitor className="text-green-600" /></div>
        <div>
          <p className="text-2xl font-bold">189</p>
          <p className="text-xs text-gray-400">Active Now</p>
        </div>
      </div>
    </div>
  );
}