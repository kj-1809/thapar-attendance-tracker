"use server";
import { AttendanceType } from "@prisma/client";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
//
export async function markAttendance({
	type,
	course_name,
}: {
	type: AttendanceType;
	course_name: string;
}) {
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
			data : {

			}
		});

		// increase the counter
		if (type == "ABSENT") {
			await prisma.takenClass.update({
				where: {
					id: takenClassId,
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
					id: takenClassId,
				},
				data: {
					present: {
						increment: 1,
					},
				},
			});
		}

		return { ok: true, data };
	} catch (err) {
		return { ok: false, data: {} };
	}
}
