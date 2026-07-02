import { NextResponse } from "next/server";

// Protect the CRMforce app: any /crmforce/* route requires a session cookie,
// except the login page itself. Everything else on the site is untouched.
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/crmforce/login";
  const hasSession = Boolean(request.cookies.get("crmforce_session")?.value);

  if (!hasSession && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/crmforce/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Already signed in but visiting the login page → send to dashboard.
  if (hasSession && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/crmforce";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crmforce/:path*"],
};
