import React from "react";
import { useNavigate } from "react-router";

export const PrivatePage = ({ children }) => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("email");
  React.useEffect(() => {
    if (false) navigate("login");
  }, [isLogin, navigate]);

  return children;
};
