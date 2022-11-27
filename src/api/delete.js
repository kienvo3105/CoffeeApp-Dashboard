import React from "react";
import { notification } from "antd";

const openNotificationWithIcon = (type, message = "", des = "") => {
  notification[type]({
    message: message,
    description: des,
  });
};

export const useDelete = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [result, setResult] = React.useState({});
  const fetchDelete = async (path, data) => {
    setIsLoading(true);
    setIsError(false);
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + path, {
      method: "DELETE",
    })
      .then((res) => {
        setIsLoading(false);
        if (!res.ok) {
          setIsError(true);
          openNotificationWithIcon("success", "Deleted!", "Success");
        }
        return res.json();
      })
      .catch((err) => {
        openNotificationWithIcon("error", response);
        setIsError(true);
        setIsLoading(false);
      });
    setResult(response);
    return response;
  };

  return { isLoading, isError, fetchDelete, result };
};
