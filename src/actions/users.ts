"use server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
export async function updateUserWithGroup(group: string) {
	const { userId } = auth();
	if (!userId) {
		return { ok: false, message: "UNAUTHORIZED" };
	}
	if(group == ""){
		return {ok: false, message: "Invalid group"}
	}
	try {
		const coursesToBeTaken = await prisma.group_to_courses.findMany({
			where: {
				group_name: group,
			},
			select: {
				course_name: true,
			},
		});

		const updatedCoursesToBeTaken = coursesToBeTaken.map((course) => {
			return {
				name: course.course_name,
				userId,
			};
		});

		await prisma.$transaction([
			prisma.user.upsert({
				where: {
					id: userId,
				},
				update: {
					currentGroup: group,
				},
				create : {
					id: userId,
					currentGroup : group
				}
			}),
			prisma.takenClass.createMany({
				data: updatedCoursesToBeTaken,
			}),
		]);

		return { ok: true };
	} catch (err) {
		console.log(err);
		return { ok: false };
	}
}
