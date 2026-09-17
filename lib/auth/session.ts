import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token");

  return {
    isLoggedIn: Boolean(accessToken),
  };
}