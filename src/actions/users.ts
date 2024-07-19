"use server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
export async function updateUserWithGroup(group: string) {
  const { userId } = auth();
  if (!userId) {
    return { ok: false, message: "UNAUTHORIZED" };
  }
  try {
    await prisma.user.update({
      data: {
        currentGroup: group,
      },
      where: {
        id: userId,
      },
    });
    return { ok: true };
  } catch (err) {
    console.log(err);
    return { ok: false };
  }
}
