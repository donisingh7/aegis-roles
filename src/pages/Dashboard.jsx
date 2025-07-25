import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, togglePassword } from "../redux/userSlice";
import { Eye, EyeOff } from "lucide-react";
import {
  ClipboardCopy,
  Coins,
  Plus,
  SendHorizontal,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCount, setUserCount] = useState(1);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const dispatch = useDispatch();
  const usersFromStore = useSelector((state) => state.userData.users);

  const validationSchema = Yup.object({
    users: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        password: Yup.string().required("Password is required"),
        balance: Yup.number()
          .typeError("Balance must be a number")
          .min(0, "Balance must be 0 or more")
          .nullable(true),
      })
    ),
  });

  const copyToClipboard = (values) => {
    const toCopy = values.users
      .slice(0, userCount)
      .map(
        (user, i) =>
          `User ${i + 1}:\nName: ${user.name}\nPassword: ${
            user.password
          }\nBalance: ${user.balance || 0}`
      )
      .join("\n\n");
    navigator.clipboard.writeText(toCopy);
    alert("Copied to clipboard!");
  };

  const createUsers = (values) => {
    const filledUsers = values.users.slice(0, userCount).map((user) => ({
      name: user.name,
      password: user.password,
      balance: user.balance ? parseInt(user.balance) : 0,
      showPassword: false,
    }));

    dispatch(addUsers(filledUsers));
    alert("Users created!");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-500">
              Manage your coin transfers and user network
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Balance</p>
                <p className="text-2xl font-bold text-[#003566]">2,450</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-md">
                <Coins className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Users Managed</p>
                <p className="text-2xl font-bold text-[#003566]">127</p>
              </div>
              <div className="bg-green-100 p-2 rounded-md">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => setIsSendModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium shadow-sm"
              >
                <SendHorizontal size={18} />
                Send Coins
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-sm font-medium shadow-sm"
              >
                <Plus size={18} />
                Add User
              </button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Created Users
            </h2>
            {usersFromStore.length === 0 ? (
              <p className="text-center text-gray-500">No user added</p>
            ) : (
              <table className="w-full text-sm text-left border border-collapse border-gray-300">
  <thead className="bg-gray-100 text-gray-600">
    <tr>
      <th className="py-2 px-4 border border-gray-300">Name</th>
      <th className="py-2 px-4 border border-gray-300">Password</th>
      <th className="py-2 px-4 border border-gray-300">Actions</th>
    </tr>
  </thead>
  <tbody>
    {usersFromStore.map((user, index) => (
      <tr key={index}>
        <td className="py-2 px-4 border border-gray-300">{user.name}</td>
        <td className="py-2 px-4 border border-gray-300">
          <div className="flex items-center gap-2">
            {user.showPassword
              ? user.password
              : "*".repeat(user.password.length)}
            <button
              type="button"
              onClick={() => dispatch(togglePassword(index))}
              className="text-blue-600"
            >
              {user.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </td>
        <td className="py-2 px-4 border border-gray-300">
          <select className="border rounded-md px-2 py-1 text-sm">
            <option hidden>Edit</option>
            <option>Withdraw All Amount</option>
            <option>Recharge</option>
            <option>Delete User</option>
            <option>Shuffle Credential</option>
          </select>
        </td>
      </tr>
    ))}
  </tbody>
</table>

            )}
          </div>
        </main>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl p-6 w-full max-w-xl space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-gray-800">Create Users</h2>

            <select
              value={userCount}
              onChange={(e) => setUserCount(parseInt(e.target.value))}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Create 1 User</option>
              <option value={2}>Create 2 Users</option>
            </select>

            <Formik
  enableReinitialize={true}
  initialValues={{
    users: Array.from({ length: userCount }, () => ({
      name: "",
      password: "",
      balance: "",
      showPassword: false,
    })),
  }}

              validationSchema={validationSchema}
              onSubmit={createUsers}
            >
              {({ values }) => (
                <Form className="space-y-4">
                  {values.users.slice(0, userCount).map((_, i) => (
                    <div
                      key={i}
                      className="space-y-3 border p-4 rounded-md bg-gray-50"
                    >
                      <h3 className="font-semibold text-gray-700">
                        User {i + 1}
                      </h3>
                      <div>
                        <Field
                          name={`users[${i}].name`}
                          placeholder="Name"
                          className="w-full border px-4 py-2 rounded-md"
                        />
                        <ErrorMessage
                          name={`users[${i}].name`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Field
                          type="password"
                          name={`users[${i}].password`}
                          placeholder="Password"
                          className="w-full border px-4 py-2 rounded-md"
                        />
                        <ErrorMessage
                          name={`users[${i}].password`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Field
                          type="number"
                          name={`users[${i}].balance`}
                          placeholder="Initial Balance (Default 0)"
                          className="w-full border px-4 py-2 rounded-md"
                        />
                        <ErrorMessage
                          name={`users[${i}].balance`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(values)}
                      className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300"
                    >
                      <ClipboardCopy size={16} />
                      Copy to Clipboard
                    </button>
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700"
                    >
                      Create User
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {isSendModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl p-6 w-full max-w-md space-y-6">
            <button
              onClick={() => setIsSendModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-gray-800">Send Coins</h2>
            <p className="text-sm text-gray-700 font-medium">
              Current Balance: 24000
            </p>

            <Formik
              initialValues={{ userId: "", amount: "", password: "" }}
              validationSchema={Yup.object({
                userId: Yup.string().required("User ID is required"),
                amount: Yup.number()
                  .typeError("Amount must be a number")
                  .required("Amount is required")
                  .min(1, "Minimum amount is 1"),
                password: Yup.string().required("Password is required"),
              })}
              onSubmit={(values) => {
                console.log("Sending coins:", values);
                alert(`Sent ${values.amount} coins to ${values.userId}`);
                setIsSendModalOpen(false);
              }}
            >
              <Form className="space-y-4">
                <div>
                  <Field
                    name="userId"
                    placeholder="User ID"
                    className="w-full border px-4 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="userId"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    name="amount"
                    type="number"
                    placeholder="Amount to be sent"
                    className="w-full border px-4 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full border px-4 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                >
                  Send Coins
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
