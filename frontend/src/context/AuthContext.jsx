import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isGuest, setIsGuest] = useState(() => localStorage.getItem("guestMode") === "true");
  const [showGuestModal, setShowGuestModal] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setIsGuest(localStorage.getItem("guestMode") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    localStorage.removeItem("guestMode");
    setToken(newToken);
    setIsGuest(false);
  };

  const enterGuestMode = () => {
    localStorage.removeItem("token");
    localStorage.setItem("guestMode", "true");
    setToken(null);
    setIsGuest(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("guestMode");
    setToken(null);
    setIsGuest(false);
  };

  const triggerGuestModal = () => {
    setShowGuestModal(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        isGuest,
        showGuestModal,
        setShowGuestModal,
        login,
        enterGuestMode,
        logout,
        triggerGuestModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
