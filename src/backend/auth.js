import React, { useContext, useState, useEffect } from "react";
  import { auth } from "./firebase";

  const AuthContext = React.createContext();

  export function useAuth() {
    return useContext(AuthContext);
  }

  export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    // felhasználó regisztrálása
    function registration(email, password) {
      return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
      return auth.signOut();
    }

    // felhaszáló beállítása, csak 1x fusson le
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user)
        setLoading(false)
      });
      return unsubscribe;
    }, []);

    const value = {
      currentUser,
      login,
      registration,
      logout
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
  }
