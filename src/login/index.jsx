import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const schema = yup.object().shape({
  userId: yup.string().required("Username is required"),
  password: yup.string().min(4, "Minimum 4 characters").required("Password is required"),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userTypeToRedirect, setUserTypeToRedirect] = useState("");

  const onSubmit = async (data) => {
    try {
      const dbRef = ref(database, "users");
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        let isValid = false;
        let userType = "";

        Object.values(users).forEach((user) => {
          if (user.userid === data.userId && user.password === data.password) {
            isValid = true;
            userType = user.userType;
          }
        });

        if (isValid) {
          setLoading(true);
          setUserTypeToRedirect(userType);
          reset();
        } else {
          alert("❌ Incorrect login credentials");
        }
      } else {
        alert("⚠ No users found in database.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("❌ Error reading from database.");
    }
  };

  useEffect(() => {
    if (loading && userTypeToRedirect) {
      const timer = setTimeout(() => {
        if (userTypeToRedirect === "player_user") navigate("/Player_User");
        else if (userTypeToRedirect === "master_user") navigate("/Master_User");
        else if (userTypeToRedirect === "super_user") navigate("/Super_User");
        else if (userTypeToRedirect === "admin_user") navigate("/Admin_User");
        else if (userTypeToRedirect === "wholesale_user") navigate("/WholeSale_User");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading, userTypeToRedirect, navigate]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-9 border-white border-t-[#2d2d61] rounded-full animate-spin"></div>
            <div className="text-white font-extrabold text-lg">
              Login successful! Redirecting...
            </div>
          </div>
        </div>
      )}
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-end pr-10"
        style={{ backgroundImage: "url('./src/assets/login.jpg')" }}
      >
        <div className="w-full max-w-sm mr-12">
          <div className="bg-[#f39a86] rounded-2xl px-10 py-10 shadow-[12px_12px_200px_rgba(1,1,1,3)]">
            <h2 className="text-2xl font-bold text-center text-[#2d2d61] mb-8">
              LOGIN TO YOUR ACCOUNT
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-[#2d2d61] mb-1">UserId :</label>
                <input
                  type="text"
                  {...register("userId")}
                  className="w-full px-4 py-2 rounded-full bg-white text-black focus:outline-none shadow"
                />
                <p className="text-red-500 text-sm">{errors.userId?.message}</p>
              </div>

              <div>
                <label className="block text-[#2d2d61] mb-1">Password :</label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full px-4 py-2 rounded-full bg-white text-black focus:outline-none shadow"
                />
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
              </div>

              <div className="flex justify-center items-center mt-6">

                <button
                  type="submit"
                  className="px-6 py-2 bg-white text-[#2d2d61] font-bold rounded-full hover:bg-gray-200"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
