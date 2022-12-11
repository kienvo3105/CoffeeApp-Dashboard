const useLocalStore = () => {
  const email = localStorage.getItem("email");

  return { email };
};

export default useLocalStore;
