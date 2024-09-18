import { jwtDecode } from "jwt-decode";
import cookies from "js-cookie";
import { config } from "process";
import type { userDataType } from "../login/page";
interface DecodedToken {
  username: string;
  exp: number;
}

export const getToken = (): string | null => {
  try {
    // const token: string | null = sessionStorage.getItem("token");
    const token: string | undefined = cookies.get("token");
    // console.log("token: ",token)
    if (!token) {
      console.log("From auth.ts getToken() Login First!.");
      return null;
    }
    return token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const decodeToken = (token: string | null): DecodedToken | null => {
  try {
    if (!token) {
      console.log("No token provided for decoding, Login first!.");
      return null;
    }
    // console.log("indecode token: ",token)
    return jwtDecode<DecodedToken>(token);
  } catch (err) {
    console.error("From Decode token: ", err);
    return null;
  }
};

export const removeToken = () => {
  console.log("in");
  const token = cookies.get("token");
  if (token) {
    cookies.remove("token");
    console.log("delete token succesful");
  } else {
    console.log("dont have this token name");
  }
};

export const login = async (userData: userDataType) => {

    const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      console.error("Failed to fetch user login", res.statusText)
      return null;
    }
    return res;

  
};
