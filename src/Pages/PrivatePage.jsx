import React from "react";
import { useNavigate } from "react-router";

export const PrivatePage = ({ children }) => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token");
  React.useEffect(() => {
    if (!isLogin) navigate("login");
  }, [isLogin, navigate]);

  return children;
};
