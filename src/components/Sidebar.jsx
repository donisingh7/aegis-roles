import React from "react";
import {
  LayoutDashboard,
  User,
  Users,
  Wallet,
  Send,
  History,
  Crown,
  Building,
  Store,
  Settings,
  User as UserIcon
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Profile", icon: User },
  { label: "User Management", icon: Users },
  { label: "Wallet", icon: Wallet },
  { label: "Transfer Coins", icon: Send },
  { label: "Transaction History", icon: History }
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white p-4 shadow-md h-screen">
      <ul className="space-y-3">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-blue-100 ${
              index === 0 ? "bg-blue-100 text-blue-600 font-semibold" : ""
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 bg-gray-200 p-4 rounded-lg">
  <h3 className="text-sm font-semibold text-gray-800 mb-3">User Hierarchy</h3>
  <ul className="space-y-2 text-sm">
    <li className="flex items-center gap-2 text-red-600">
      <Crown className="w-4 h-4" />
      <span>Admin</span>
    </li>
    <li className="flex  items-center gap-2 text-blue-600">
      <Building className="w-4 h-4" />
      <span>Wholesaler</span>
    </li>
    <li className="flex  items-center gap-2 text-green-600">
      <Store className="w-4 h-4" />
      <span>Distributor</span>
    </li>
    <li className="flex  items-center gap-2 text-yellow-600">
      <Settings className="w-4 h-4" />
      <span>Master User</span>
    </li>
    <li className="flex  items-center gap-2 text-gray-700">
      <UserIcon className="w-4 h-4" />
      <span>Player User</span>
    </li>
  </ul>
</div>
    </div>
  );
}
