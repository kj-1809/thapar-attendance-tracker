"use server";
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Wednesday",
];

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function getClasses(day_number: number) {
	const { userId } = auth();
	if (!userId) {
		return { ok: false };
	}
	try {
		// get the group
		const user = await prisma.user.findFirst({
			where: {
				id: userId,
			},
			select: {
				currentGroup: true,
			},
		});

		if (!user) {
			return { ok: false };
		}
		// get the classes
		const classes = await prisma.detail_class.findMany({
			where: {
				day: days[day_number],
				group_name: user.currentGroup,
			},
			orderBy: {
				slot: "asc",
			},
		});

		return {ok: true, classes, group : user.currentGroup};
	} catch (err) {
		return { ok: false, error: err };
	}
}
