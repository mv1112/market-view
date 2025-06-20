// Temporarily disabled middleware for testing
// import { updateSession } from "@/lib/middleware"
import { updateSession, addSecurityHeaders } from "@/lib/middleware"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // For development, simplify middleware to prevent hanging
  if (process.env.NODE_ENV === 'development') {
    let response = NextResponse.next()
    response = addSecurityHeaders(response)
    return response
  }
  
  // Apply authentication middleware in production
  let response = await updateSession(request)
  
  // Add security headers
  response = addSecurityHeaders(response)
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
