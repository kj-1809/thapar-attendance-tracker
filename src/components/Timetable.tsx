"use client";
import React from "react";
import ClassCard from "./ClassCard";
import { DatePicker } from "@/components/DatePicker";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getClasses } from "@/actions/classes";
import LoadingSkeleton from "./LoadingSkeleton";
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
	const [date, setDate] = useState<Date>(new Date(new Date().toDateString()));
	const queryClient = useQueryClient()

	const {
		data: classes,
		isLoading,
	} = useQuery({
		queryKey: ["classes", date.getTime()],
		queryFn: async () => {
			const { classes } = await getClasses(date.toISOString(), group);
			return classes;
		},
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000,
	});

	function handleDateChange(date: Date) {
		console.log(date);
		if (date) {
			setDate(date);
			queryClient.invalidateQueries({queryKey : ["classes", date.getTime()]})
		}
	}


	return (
		<>
			<div className="flex justify-between mt-2 sm:mx-4">
				<h1 className="px-4 py-2 bg-purple-200 rounded-md">{group}</h1>
				<DatePicker date={date} onChangeDate={handleDateChange} />
			</div>

			{isLoading && (
				<div className="flex flex-col items-center">
					<LoadingSkeleton />
				</div>
			)}
			{!isLoading && (
				<div className="flex flex-col items-center">
					{classes.length == 0 && (
						<h1 className="mt-10">No classes for this day ! Relax ! </h1>
					)}
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
			<div className="flex justify-center">
				<h1 className="mt-8 mx-auto">Designed and Developed by KJ</h1>
			</div>
		</>
	);
}
