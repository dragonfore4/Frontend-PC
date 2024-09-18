"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getToken, decodeToken } from "../Functions/auth";
import cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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
      // กรณีที่ไม่มี token ให้ตั้งค่า user และ token เป็น null และหยุดการทำงาน
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    // console.log("Token exists, decoding...");

    const decodedToken = decodeToken(tokenData);
    if (decodedToken) {
      const { username, exp } = decodedToken;
      // console.log(username, exp);

      // เช็คว่าหมดอายุหรือยัง
      if (exp * 1000 < Date.now()) {
        cookies.remove("token");
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }

      // ถ้าไม่หมดอายุ ตั้งค่า user และ token
      setUser(username);
      setToken(tokenData);
    } else {
      setUser(null);
      setToken(null);
    }

    setLoading(false); // ตั้งค่าให้เสร็จสิ้นการโหลด
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
