"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: {
    email: string;
    name: string;
    organizationId: number;
    id: number;
    stripeId: string | null;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser) {
      setUser(null);
      setIsAuthChecked(true);
      return;
    }

    if (storedUser && storedToken) {
      setLoading(true);

      fetch("https://api.fortalk.app.br/users/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: storedToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setIsAuthChecked(true);
            setLoading(false);
            return;
          }

          if (data.email) {
            setUser(data);
            setIsAuthChecked(true);
            setLoading(false);
          } else {
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setIsAuthChecked(true);
            setLoading(false);
          }

          return;
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
