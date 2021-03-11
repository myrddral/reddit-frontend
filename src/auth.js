import React, { useContext, useState, useEffect } from "react";
  import { auth } from "./firebase";

  const AuthContext = React.createContext();

  export function useAuth() {
    return useContext(AuthContext);
  }

  export function AuthProvider({ children }) {
    const [currentUSer, setCurrentUser] = useState();

    // felhasználó regisztrálása
    function registration(email, password) {
      return auth.createUserWithEmailAndPassword(email, password);
    }

    // felhaszáló beállítása, csak 1x fusson le
    useEffect(() => {
      const logout = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
      });
      return logout;
    }, []);

    const value = {
      currentUSer,
      registration,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }