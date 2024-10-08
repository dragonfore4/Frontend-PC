"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getToken, decodeToken } from "../Functions/auth"; // Ensure getToken is working correctly
import cookies from "js-cookie";
// import jwtDecode from "jwt-decode"; // Using jwt-decode directly

interface AuthContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  fetchAuthData: () => void;
}

interface DecodeToken {
  username: string;
  exp: number;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType | undefined => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const fetchAuthData = async () => {
    const tokenData = getToken();
    
    if (!tokenData) {
      // If no token is found, set user and token to null
      setUser(null);
      setToken(null);
      setLoading(false); // Always stop loading
      return;
    }

    try {
      // Using jwt-decode directly
      const decodedToken: DecodeToken | null = decodeToken(tokenData);

      if (decodedToken) {
        const { username, exp } = decodedToken;

        // Check if the token has expired
        if (exp * 1000 < Date.now()) {
          cookies.remove("token");
          setUser(null);
          setToken(null);
        } else {
          // Token is valid, set user and token
          setUser(username);
          setToken(tokenData);
        }
      }
    } catch (error) {
      // Handle decoding errors
      console.error("Error decoding token:", error);
      setUser(null);
      setToken(null);
    } finally {
      // Always stop loading after the check
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, fetchAuthData }}
    >
      {!loading ? (
        children
      ) : (
        <div className="w-full min-h-screen pt-[10vh] bg-gray-900 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 text-white">
            d
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};


