import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../utils/rapid";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("New");

  useEffect(() => {
    fetchAllData(value);
  }, [value]);

  const fetchAllData = async (query) => {
    setLoading(true);
    try {
      const res = await fetchData("search", {
        part: "snippet",
        q: query,
        type: "video",
        maxResults: 20,
      });

      console.log("Fetched contents:", res);

      setData(Array.isArray(res?.items) ? res.items : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loading, data, value, setValue }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
