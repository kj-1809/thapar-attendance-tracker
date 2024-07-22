"use client";
import React from "react";
import ClassCard from "./ClassCard";
import { detail_class } from "@prisma/client";
import { DatePicker } from "@/components/DatePicker";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getClasses } from "@/actions/classes";
const slotToTime = [
	"8:00",
	"8:50",
	"9:40",
	"10:30",
	"11:20",
	"12:10",
	"1:00",
	"1:50",
	"2:40",
	"3:30",
	"4:20",
	"5:10",
];

export default function Timetable({ group }: { group: string }) {
	const [date, setDate] = useState<Date>(new Date());

	const {
		refetch,
		data: classes,
		isLoading,
	} = useQuery({
		queryKey: ["classes", date],
		queryFn: async () => {
			const { classes } = await getClasses(date);
			return classes;
		},
	});

	function handleDateChange(date: Date) {
		setDate(date);
	}

	return (
		<>
			<div className="flex justify-between mt-2 sm:mx-4">
				<h1 className="px-4 py-2 bg-purple-200 rounded-md">{group}</h1>
				<DatePicker date={date} onChangeDate={handleDateChange} />
			</div>

			{isLoading && <h1 className="mx-auto my-2">Loading...</h1>}
			{!isLoading && (
				<div className="flex flex-col items-center">
					{classes.length == 0 && <h1>No classes! let's gooo!!!! </h1>}
					{classes.map((class_item: any) => {
						return (
							<ClassCard
								key={class_item.id}
								name={class_item.course_name!}
								professor={class_item.professor!}
								location={class_item.location!}
								time={slotToTime[class_item.slot || 0]}
								markedAttendance={class_item.markedAttendance}
								date={date}
								slot={class_item.slot}
								type={class_item.type}
							/>
						);
					})}
				</div>
			)}
		</>
	);
}
