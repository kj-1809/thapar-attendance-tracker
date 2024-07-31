"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export async function getClasses(dateString: string, group: string) {
	const date = new Date(dateString);
	const adjustedDate = new Date(date.getTime() + 1000 * 60 * 60 * 5.5);

	
	let day_number = adjustedDate.getUTCDay()

	const { userId } = auth();
	if (!userId) {
		return { ok: false };
	}

	console.log("date adjusted : ", adjustedDate)
	console.log("serverrrrr day num : ", day_number)
	console.log("offset : ", date.getTimezoneOffset())
	console.log("offset 2: ", adjustedDate.getTimezoneOffset())
	

	try {
		// get the classes
		const classes: any = await prisma.detail_class.findMany({
			where: {
				day: days[day_number],
				group_name: group
			},
			orderBy: {
				slot: "asc",
			},
		});

		const updatedDate = new Date(date.toDateString());
		console.log("updated date : ", updatedDate)
		// get the already marked attendance
		const attendances = await prisma.attendance.findMany({
			where: {
				date: {
					gte: updatedDate,
					lt: new Date(updatedDate.getTime() + 24 * 60 * 60 * 1000),
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
		let j = 0;
		let m = classes.length;
		while (j < m) {
			if (attendances[i] && classes[j].slot === attendances[i].slot) {
				classes[j].markedAttendance = attendances[i].type === "ABSENT" ? -1 : 1;
				i++;
			} else {
				classes[j].markedAttendance = 0;
			}
			j++;
		}

		return { ok: true, classes };
	} catch (err) {
		console.log(err);
		return { ok: false, error: err };
	}
}
