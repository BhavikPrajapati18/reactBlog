import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    AuthService.logout()
      .then(() => {
        dispatch(logout());
        localStorage.removeItem("session");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <button
      className="bg-gradient-to-r from-red-500 to-red-700 text-white px-5 py-2 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
