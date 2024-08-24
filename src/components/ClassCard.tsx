"use client";
import { Check, LoaderCircle, X } from "lucide-react";
import React from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAttendance, unmarkAttendance } from "@/actions/attendance";
import { AttendanceType } from "@prisma/client";
import toast from "react-hot-toast";

export default function ClassCard({
	name,
	professor,
	location,
	time,
	markedAttendance,
	markedAttendanceId,
	type,
	slot,
	date,
	class_name,
}: {
	name: string;
	professor: string;
	location: string;
	time: string;
	markedAttendance: number;
	markedAttendanceId: string | undefined;
	type: string;
	slot: number;
	date: Date;
	class_name: string;
}) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (typeOfAttendance: AttendanceType) => {
			return await markAttendance({
				slot: slot,
				date: date,
				course_name: name,
				type: typeOfAttendance,
			});
		},
		onSuccess: () => {
			toast.success("Attendance marked!");
			queryClient.invalidateQueries({ queryKey: ["classes", date] });
		},
		onError: () => {
			toast.error("Operation Failed!");
		},
	});

	const { isPending: isUnmarkingAttendance, mutate: unmark } = useMutation({
		mutationFn: async (attendanceId: string) => {
			console.log("haha");
			const res = await unmarkAttendance({ attendanceId });
			if (!res.ok) {
				throw new Error(res.message);
			}
			return res;
		},
		onSuccess: (data) => {
			toast.success("Unmarked attendance");
		},
		onError: (err) => {
			console.log(err);
			toast.error("Some error occured!");
		},
	});

	return (
		<div className="rounded-xl p-4 shadow-md flex mt-4 justify-between max-w-[500px] w-full">
			<div className="flex">
				<div className="flex flex-col justify-center">
					<h1 className="text-6xl font-archivoBlack">{time.split(":")[0]}</h1>
					<h1 className="text-6xl font-archivoBlack">{time.split(":")[1]}</h1>
				</div>
				<div className="mx-4 h-32 w-1 bg-gray-300"></div>
				<div className="flex flex-col justify-center">
					<h1 className="text-md sm:text-lg">
						{name} {type}
					</h1>
					{class_name && <h1 className="text-md sm:text-lg">{class_name}</h1>}
					<h1 className="text-md sm:text-lg">{location}</h1>
					{!class_name && <h1 className="text-md sm:text-lg">{professor}</h1>}
				</div>
			</div>
			{markedAttendance === 0 && (
				<div className="flex items-center">
					{(isPending || isUnmarkingAttendance) && (
						<LoaderCircle className="animate-spin mr-2" />
					)}
					{!(isPending || isUnmarkingAttendance) && (
						<div className="flex items-center">
							<Dialog>
								<DialogTrigger>
									<div className="rounded-full p-3 bg-green-100 m-2">
										<Check />
									</div>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Mark as Present ?</DialogTitle>
										<DialogDescription>
											This action can be undone.
										</DialogDescription>
									</DialogHeader>
									<button
										className="bg-green-300 px-4 py-2 rounded-md"
										onClick={() => {
											if (new Date().getTime() < date.getTime()) {
												toast.error("Future attendance cannot be marked!");
												return;
											}
											mutate("PRESENT");
										}}
									>
										Mark present
									</button>
								</DialogContent>
							</Dialog>
							<Dialog>
								<DialogTrigger>
									<div className="rounded-full p-3 bg-red-100 m-2">
										<X />
									</div>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Mark as Absent ?</DialogTitle>
										<DialogDescription>
											This action can be undone.
										</DialogDescription>
									</DialogHeader>
									<button
										className="bg-red-300 px-4 py-2 rounded-md"
										onClick={() => {
											if (new Date().getTime() < date.getTime()) {
												toast.error("Future attendance cannot be marked!");
												return;
											}
											mutate("ABSENT");
										}}
									>
										Mark absent
									</button>
								</DialogContent>
							</Dialog>
						</div>
					)}
				</div>
			)}
			{markedAttendance === 1 && (
				<Dialog>
					<DialogTrigger>
						<div className="flex flex-col items-center justify-center p-2">
							<Check className="bg-green-200 rounded-full p-1 mb-1" />
							<h1>Present</h1>
						</div>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Unmark Present Attendance ?</DialogTitle>
							<DialogDescription>This action can be undone.</DialogDescription>
						</DialogHeader>
						<button
							className="bg-red-300 px-4 py-2 rounded-md"
							onClick={() => {
								unmark(markedAttendanceId!);
							}}
						>
							Unmark Present
						</button>
					</DialogContent>
				</Dialog>
			)}
			{markedAttendance === -1 && (
				<Dialog>
					<DialogTrigger>
						<div className="flex flex-col items-center justify-center p-2">
							<X className="bg-red-200 rounded-full p-1 mb-1" />
							<h1>Absent</h1>
						</div>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Unmark Absent Attendance ?</DialogTitle>
							<DialogDescription>This action can be undone.</DialogDescription>
						</DialogHeader>
						<button
							className="bg-red-300 px-4 py-2 rounded-md"
							onClick={() => {
								unmark(markedAttendanceId!);
							}}
						>
							Unmark Absent
						</button>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
