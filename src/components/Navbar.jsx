import React from "react";
import { Layers, WalletCards } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Layers className="w-5 h-5 text-blue-600" />
        <h1 className="text-lg font-semibold text-blue-800">CoinFlow</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-lg text-gray-700 gap-2">
            <WalletCards className="w-4 h-4 text-blue-600" />
            <span>Balance: 2,450 Coins</span>
          </div>

          <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-lg text-gray-700 gap-2">
            <WalletCards className="w-4 h-4 text-green-600" />
            <span>Added Tokens: 12</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/300"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-sm leading-tight">
            <p className="font-semibold text-gray-800">John Doe</p>
            <p className="text-gray-500 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
  