import React from "react";

export const usePost = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [result, setResult] = React.useState({});
  const fetchPost = async (path, data) => {
    setIsLoading(true);
    setIsError(false);
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + path, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (!res.ok) setIsError(true);
        return res.json();
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
    setResult(response);
    return response;
  };

  return { isLoading, isError, fetchPost, result };
};
