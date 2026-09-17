import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(request: Request) {
  if (!API_URL) {
    return NextResponse.json(
      { message: "API_URL is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const response = await fetch(
      `${API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const responseData = NextResponse.json({
      message: "Login successful",
    });

    responseData.cookies.set(
      "access_token",
      data.access_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      }
    );

    return responseData;
  } catch {
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}