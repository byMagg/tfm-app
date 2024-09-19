import { auth } from "@/lib/firebase/server";

export async function getUser(cookie: string) {
  try {
    const decodedIdToken = await auth.verifySessionCookie(cookie, true);
    return auth.getUser(decodedIdToken.uid);
  } catch (error) {
    return null;
  }
}

export async function setUserAdmin(uid: string) {
  try {
    await auth.setCustomUserClaims(uid, { admin: true });
  } catch (error) {
    console.error(error);
  }
}
