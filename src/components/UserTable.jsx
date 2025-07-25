import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  rechargeUser,
  withdrawAll,
  shuffleCredential,
} from "../redux/userSlice";
import { Eye, EyeOff, MoreVertical } from "lucide-react";

export default function UserTable() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [showPasswordIndex, setShowPasswordIndex] = useState(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  if (users.length === 0) {
    return (
      <div className="bg-white p-4 rounded-md shadow text-gray-500 text-center">
        No user added
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Recent Transactions
      </h2>
      <table className="w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left text-gray-700">Name</th>
            <th className="border px-4 py-2 text-left text-gray-700">
              Password
            </th>
            <th className="border px-4 py-2 text-left text-gray-700">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2 flex items-center gap-2">
                {showPasswordIndex === index ? user.password : "********"}
                <button
                  onClick={() =>
                    setShowPasswordIndex(
                      showPasswordIndex === index ? null : index
                    )
                  }
                >
                  {showPasswordIndex === index ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </td>
              <td className="border px-4 py-2 relative">
                <button
                  onClick={() =>
                    setOpenDropdownIndex(
                      openDropdownIndex === index ? null : index
                    )
                  }
                >
                  <MoreVertical size={16} />
                </button>
                {openDropdownIndex === index && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-10">
                    <button
                      onClick={() => {
                        dispatch(withdrawAll(index));
                        setOpenDropdownIndex(null);
                      }}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    >
                      Withdraw All Amount
                    </button>
                    <button
                      onClick={() => {
                        dispatch(rechargeUser(index));
                        setOpenDropdownIndex(null);
                      }}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    >
                      Recharge
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deleteUser(index));
                        setOpenDropdownIndex(null);
                      }}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    >
                      Delete User
                    </button>
                    <button
                      onClick={() => {
                        dispatch(shuffleCredential(index));
                        setOpenDropdownIndex(null);
                      }}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    >
                      Shuffle Credential
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
