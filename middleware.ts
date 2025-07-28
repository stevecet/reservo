import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  // if (request.nextUrl.pathname.startsWith("/admin")) {
  //   // In a real application, you would check for valid admin authentication
  //   // For demo purposes, we'll allow access
  //   // You should implement proper JWT token validation here

  //   const isAuthenticated = request.cookies.get("admin-token")
  //   const isAdmin = request.cookies.get("user-role")?.value === "admin"

  //   if (!isAuthenticated || !isAdmin) {
  //     // Redirect to admin login page
  //     return NextResponse.redirect(new URL("/admin/login", request.url))
  //   }
  // }
  if (request.nextUrl.pathname === "/admin/login") {
  return NextResponse.next()
}


  // Check if the request is for provider dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard/provider")) {
    const userRole = request.cookies.get("user-role")?.value

    if (userRole !== "provider" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  // Check if the request is for client dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard/client")) {
    const userRole = request.cookies.get("user-role")?.value

    if (userRole !== "client" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/provider/:path*", "/dashboard/client/:path*"],
}
