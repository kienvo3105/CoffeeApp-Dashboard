import React from "react";

export const useGet = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [result, setResult] = React.useState(undefined);
  const fetchGet = async (path) => {
    setIsLoading(true);
    setIsError(false);
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + path)
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

  return { isLoading, isError, fetchGet, result };
};
