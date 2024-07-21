"use server";
import { AttendanceType } from "@prisma/client";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
//
// export async function markAttendance({
// 	type,
// 	takenClassId,
// }: {
// 	type: AttendanceType;
// 	takenClassId: string;
// }) {
// 	const { userId } = auth();
// 	console.log(userId);
//
// 	if (!userId) {
// 		return { ok: false, data: {} };
// 	}
//
// 	try {
// 		// add attendance
// 		const data = await prisma.attendance.create({
// 			data: {
// 				type,
// 				userId,
// 				takenClassId,
// 			},
// 		});
// 		
// 		// increase the counter
// 		if (type == "ABSENT") {
// 			await prisma.takenClass.update({
// 				where: {
// 					id: takenClassId,
// 				},
// 				data: {
// 					absent: {
// 						increment: 1,
// 					},
// 				},
// 			});
// 		} else {
// 			await prisma.takenClass.update({
// 				where: {
// 					id: takenClassId,
// 				},
// 				data: {
// 					present: {
// 						increment: 1,
// 					},
// 				},
// 			});
// 		}
//
// 		return { ok: true, data };
// 	} catch (err) {
// 		return { ok: false, data: {} };
// 	}
// }
