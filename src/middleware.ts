import { createMiddleware } from "next-easy-middlewares";
import { type NextRequest, NextResponse } from "next/server";

const middlewares = {
  "/blog1": [
    async (request: NextRequest) => {
      console.log("Middleware for /blog1", request.nextUrl.pathname);
      return NextResponse.next();
    },
  ],
  "/blog2": [
    async (request: NextRequest) => {
      console.log("Middleware for /blog2", request.nextUrl.pathname);
      return NextResponse.redirect("http://localhost:3000/blog1");
    },
    async (request: NextRequest) => {
      console.log(
        "Middleware for /blog2 - Problematic Middleware that will make the redirect not work",
        request.nextUrl.pathname
      );
      return NextResponse.next();
    },
  ],
};

// Create middlewares helper
export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: ["/((?!api/|_next/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};
