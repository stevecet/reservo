"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type UserRole = "client" | "provider" | "admin" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing authentication on mount
    const token =
      document.cookie.includes("admin-token=valid") ||
      document.cookie.includes("user-token=valid");
    const roleMatch = document.cookie.match(/user-role=([^;]+)/);
    const role = roleMatch ? (roleMatch[1] as UserRole) : null;

    if (token && role) {
      // In a real app, validate the token and fetch user data
      setUser({
        id: "1",
        name: role === "admin" ? "Admin User" : "Demo User",
        email: role === "admin" ? "admin@reservo.com" : "user@example.com",
        role,
        verified: true,
      });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    // Simulate authentication
    if (
      role === "admin" &&
      email === "admin@reservo.com" &&
      password === "admin123"
    ) {
      const adminUser: User = {
        id: "1",
        name: "Admin User",
        email: "admin@Reservo.com",
        role: "admin",
        verified: true,
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      document.cookie = "admin-token=valid; path=/";
      document.cookie = "user-role=admin; path=/";
      return true;
    }

    // Add other role authentications here
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    document.cookie =
      "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "user-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role || user?.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
