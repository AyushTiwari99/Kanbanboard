import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!data) {
      axios.get(process.env.REACT_APP_API_URL).then(({ data }) => {
        setData(data);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ data, setData}}>
      {children}
    </UserContext.Provider>
  );
}