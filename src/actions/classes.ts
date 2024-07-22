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

export async function getClasses(date: Date) {
	const day_number = date.getDay();
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
		const classes: any = await prisma.detail_class.findMany({
			where: {
				day: days[day_number],
				group_name: user.currentGroup,
			},
			orderBy: {
				slot: "asc",
			},
		});

		// get the already marked attendance
		const attendances = await prisma.attendance.findMany({
			where: {
				date: {
					gte: date,
					lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
				},
				userId: userId,
			},
			select: {
				slot: true,
				type: true,
			},
			orderBy: {
				slot: "asc",
			},
		});

		let i = 0;
		let n = attendances.length;
		let j = 0;
		let m = classes.length;

		console.log("i", i);
		console.log(n);
		console.log(attendances);

		while (j < m) {
			console.log("j" , j)
			console.log(classes[j])
			if (attendances[i] && classes[j].slot === attendances[i].slot) {
				classes[j].markedAttendance = attendances[i].type === "ABSENT" ? -1 : 1;
				i++;
			} else {
				classes[j].markedAttendance = 0;
			}
			j++;
		}

		return { ok: true, classes, group: user.currentGroup };
	} catch (err) {
		console.log(err)
		return { ok: false, error: err };
	}
}
