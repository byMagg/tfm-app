import type { JwtPayload } from "@/types";
import { fetchAPI } from "@/utils";
import { jwtDecode } from "jwt-decode";

export async function getUser(cookie: string) {
  try {
    const res = await fetchAPI({
      endpoint: "/users/profile",
    });

    return res.user;
    // const decodedIdToken = await auth.verifySessionCookie(cookie, true);
    // return auth.getUser(decodedIdToken.uid);
  } catch (error) {
    return null;
  }
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetchAPI({
      endpoint: "/login",
      method: "POST",
      body: {
        email,
        password,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export function decodeJWT(token: string): JwtPayload {
  return jwtDecode(token);
}

// export async function setUserAdmin(uid: string) {
//   try {
//     await auth.setCustomUserClaims(uid, { admin: true });
//   } catch (error) {
//     console.error(error);
//   }
// }
