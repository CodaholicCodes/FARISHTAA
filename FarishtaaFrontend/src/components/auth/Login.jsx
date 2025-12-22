import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessages from "./common/ErrorMessages";
import FarishtaaLogo from "../logo/FarishtaaLogo";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const emailref = useRef();
  const passwordref = useRef();
  const {token}=useSelector(state=>state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const res = await fetch("https://farishtaa-production.up.railway.app/api/auth/login", {
        method: "POST",
        headers: {
         "Authorization": `Bearer ${token}`,
         "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email : emailref.current.value,
          password : passwordref.current.value,
        }),
      });

      if (res.status === 200) {
        const data=await res.json();
         const id=data.userId;
         dispatch(login(data));
         navigate(`/`);
        return;
      }

      if (res.status === 401 || res.status === 500) {
        const data = await res.json();
        setErrors(data.errorMessages);
        return;
      }
    } catch (err) {
      console.error("Error during login:", err);
      setErrors(["Authentication Failed."]);
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-red-50 via-white to-red-100 px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10 
                   border border-red-200 backdrop-blur-sm"
      >
        {/* Logo Block */}
        <div className="flex flex-col items-center mb-6">
          <FarishtaaLogo />

          <h2 className="text-3xl font-bold text-red-600 mt-3 tracking-wide drop-shadow-[0_2px_6px_rgba(255,0,0,0.3)]">
            फरिश्ता
          </h2>
          <p className="text-sm text-red-500 mt-1">Health . Trust . Care</p>
        </div>

        <h3 className="text-xl font-semibold text-red-700 mb-5 text-center">
          Login to Your Account
        </h3>

        <ErrorMessages errors={errors} />

        {/* Email */}
        <label className="block text-sm font-medium text-red-700 mt-4">
          Email
        </label>
        <input
          type="email"
          ref={emailref}
          className="w-full mt-1 p-2 border border-red-300 rounded-lg 
                     focus:ring-2 focus:ring-red-500 outline-none"
          placeholder="your@example.com"
        />

        {/* Password */}
        <label className="block text-sm font-medium text-red-700 mt-4">
          Password
        </label>
        <input
          type="password"
          ref={passwordref}
          className="w-full mt-1 p-2 border border-red-300 rounded-lg 
                     focus:ring-2 focus:ring-red-500 outline-none"
          placeholder="Enter password"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg 
                     text-lg font-semibold hover:bg-red-700 transition mt-6"
        >
          Login
        </button>

        {/* Register link */}
        <p className="text-center mt-5 text-sm text-red-600">
          New here?{" "}
          <span
            className="font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
