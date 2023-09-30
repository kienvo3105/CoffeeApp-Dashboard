import React from "react";
import { useNavigate } from "react-router";

export const PrivatePage = ({ children }) => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token");
  console.log("🚀 ~ file: PrivatePage.jsx:7 ~ PrivatePage ~ isLogin:", isLogin)
  React.useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  return children;
};
