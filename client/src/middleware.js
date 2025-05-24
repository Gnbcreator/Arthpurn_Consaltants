import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function middleware(req) {
    const cookieStore = await cookies();
    const userRefreshToken = cookieStore.get("userRefreshToken");
    const adminRefreshToken = cookieStore.get("adminRefreshToken");

    const isAuthPage = req.nextUrl.pathname.startsWith("/user/auth/signin") || req.nextUrl.pathname.startsWith("/user/auth/signup");
    const isadminAuthPage = req.nextUrl.pathname.startsWith("/admin/auth/signin") || req.nextUrl.pathname.startsWith("/admin/auth/signup");

    const isProtectedPage = req.nextUrl.pathname.startsWith("/user/dashboard");
    const adminProtectedDashboard = req.nextUrl.pathname.startsWith("/admin/dashboard/chats");

    if (adminRefreshToken && isadminAuthPage) {
        return NextResponse.redirect(new URL("/admin/dashboard/chats", req.url));
    }
    if (!adminRefreshToken && adminProtectedDashboard) {
        return NextResponse.redirect(new URL("/admin/auth/signin", req.url));
    }

    if (userRefreshToken && isAuthPage) {
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }

    if (!userRefreshToken && isProtectedPage) {
        return NextResponse.redirect(new URL("/user/auth/signin", req.url));
    }



    return NextResponse.next();
}

export const config = {
    matcher: [
        "/user/dashboard/:path*",
        "/user/auth/signin",
        "/user/auth/signup",

        "/admin/dashboard/chats/:path*",
        "/admin/auth/signin",
        "/admin/auth/signup",


    ],
};
