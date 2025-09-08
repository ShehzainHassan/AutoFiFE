import { NextResponse } from "next/server";

function generateNonce(): string {
  const array = crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCharCode(...array));
}

export function middleware() {
  const nonce = generateNonce();

  const response = NextResponse.next();

  response.cookies.set({
    name: "nonce",
    value: nonce,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}'`,
    `style-src 'self' 'nonce-${nonce}'`,
    `img-src 'self' data: blob:`,
    `font-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  return response;
}
