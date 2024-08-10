import React, { createContext, useContext, useState } from "react";

const Context = createContext<any | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState("");

  return (
    <Context.Provider value={{ userId, setUserId }}>
      {children}
    </Context.Provider>
  );
};

const useStore = () => {
  const context = useContext(Context);
  if (!context) return "useTheme must be used within ThemeProvider!";
  return context;
};

export default useStore;
