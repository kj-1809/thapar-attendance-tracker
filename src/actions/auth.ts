"use server";

import { auth } from "@clerk/nextjs/server";

export async function isAuthenticated() {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  return true;
}
