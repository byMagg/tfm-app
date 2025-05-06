import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
  user: User | null;
  token: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userToken = await user.getIdToken();
        setUser(user);
        setToken(userToken);
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {};

  const logout = async () => {
    const auth = getAuth();
    await auth.signOut();
    setUser(null);
    setToken(null);
    navigate("/profile");
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
