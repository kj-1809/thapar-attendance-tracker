"use server";
import { AttendanceType } from "@prisma/client";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
//
export async function markAttendance({
	type,
	course_name,
	date,
	slot

}: {
	type: AttendanceType;
	course_name: string;
	date: Date
	slot: number
}) {
	
	if(new Date().getTime() < date.getTime()){
		return {ok: false, message : "attendance in the future cannot be marked !"}
	}

	const { userId } = auth();
	console.log(userId);

	if (!userId) {
		return { ok: false, message: "user is not logged in" };
	}

	try {
		const takenClassData = await prisma.takenClass.findFirst({
			where: {
				userId,
				name: course_name,
			},
			select: {
				id: true,
			},
		});

		if (!takenClassData) {
			return { ok: false, message: "class not found" };
		}

		// add attendance
		const data = await prisma.attendance.create({
			data: {
				type,
				date,
				slot,
				takenClassId: takenClassData.id,
				userId
			}
		});

		// increase the counter
		if (type == "ABSENT") {
			await prisma.takenClass.update({
				where: {
					id: takenClassData.id,
				},
				data: {
					absent: {
						increment: 1,
					},
				},
			});
		} else {
			await prisma.takenClass.update({
				where: {
					id: takenClassData.id,
				},
				data: {
					present: {
						increment: 1,
					},
				},
			});
		}

		return { ok: true, message: "success" };
	} catch (err) {
		return { ok: false, message : "error" };
	}
}
