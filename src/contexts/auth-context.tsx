"use client";

import LoadingAnimation from "@/app/loading";
import { getUserById } from "@/lib/api/users";
import { verifySession } from "@/lib/auth";
import { Users } from "@prisma/client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Define the shape of our context
type AuthContextType = {
  userId: string | null;
  userData: Users | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  userId: null,
  userData: null,
  isAuthenticated: false,
  logout: async () => {},
});

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<Users | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { userId } = await verifySession();
        const user = await getUserById(userId!);
        if (!user) {
          throw new Error("User not found");
        }
        setUserId(userId);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Logout function - call logout API
  const logout = async () => {
    try {
      // Call logout API to clear the session cookie on the server
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        setUserId(null);
        setUserData(null);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <LoadingAnimation />; // Or your loading component
  }

  return (
    <AuthContext.Provider
      value={{
        userId,
        userData,
        isAuthenticated: !!userId,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
