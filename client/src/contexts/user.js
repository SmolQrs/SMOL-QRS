import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token;
  });
  const { performFetch, isLoading, error } = useFetch("/users/user", (data) =>
    setUser(data?.result)
  );

  useEffect(() => {
    if (token) {
      performFetch({
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
