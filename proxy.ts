// this file check if a user is loged in then redirect to the checkout page other wise it will redirect to the log in page and then it will redirect to the checkout again
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  
  if (!accessToken) {
    const loginUrl = new URL("/logIn", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname
    );
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*"],
};