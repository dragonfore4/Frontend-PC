import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken, deleteToken, getToken } from './functions/auth';
import { jwtDecode } from 'jwt-decode';

export function middleware(request: NextRequest) {
    console.log("Middleware executed");

    // Get the token from the cookies
    const token = request.cookies.get("token")?.value;
    console.log(token)

    if (token) {
    //     // const decodedToken: DecodedToken | null = decodeToken(token);
        interface DecodedToken {
            username: string;
            exp: number;
        }

        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log(decodedToken.username);
        if (decodedToken) {
            const { username, exp } = decodedToken;
            console.log(username, exp);
            if (exp * 1000 < Date.now()) {
                request.cookies.delete("token");
            }

            // Check if the username is 'admin'

            if (username === "admin" && request.nextUrl.pathname === "/admin") {
                return NextResponse.next()
            }

            if (username === "admin") {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        } else {
            console.log("Failed to decode token");
        }
    } else {
        console.log("No token found in cookies, redirecting to home");
    }

    // Redirect to home if the token is invalid or not found
    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: ['/admin'], // Matches the path where the middleware should run
};
