import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(request: Request) {
  if (!API_URL) {
    return NextResponse.json(
      { message: "API_URL is not configured" },
      { status: 500 }
    );
  }

  const body = await request.json();

  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: body.name,
      email: body.email,
      password: body.password,
      avatar: "https://picsum.photos/800",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        message: data.message || "Registration failed",
      },
      { status: response.status }
    );
  }

  return NextResponse.json(
    {
      message: "Registration successful",
    },
    { status: 201 }
  );
}