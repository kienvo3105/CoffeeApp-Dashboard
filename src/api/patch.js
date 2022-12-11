import React from "react";

export const usePatch = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [result, setResult] = React.useState({});
  const token = localStorage.getItem("token");

  const fetchPatch = async (path, data) => {
    setIsLoading(true);
    setIsError(false);
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + path, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

  return { isLoading, isError, fetchPatch, result };
};