"use client";
import React from "react";
import ClassCard from "./ClassCard";
import { detail_class } from "@prisma/client";
import DayDropdown from "./DayDropdown";
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

export default function Timetable({
	initialClasses,
	group,
}: {
	initialClasses: detail_class[];
	group: string;
}) {
	const [date, setDate] = useState<Date>(new Date());
	const [classes, setClasses] = useState(initialClasses);

	const { isPending, mutate: fetchClasses } = useMutation({
		mutationFn: async () => {
			const data = await getClasses(date.getDay());
			return data;
		},
		onSuccess: (data) => {
			if (data.ok && data.classes) {
				setClasses(data.classes);
			}
		},
		onError: (err) => {
			console.log(err);
			toast.error("Some error occured while fetching!");
		},
	});

	function handleDateChange(date: Date) {
		setDate(date);
		fetchClasses();
	}

	return (
		<>
			<div className="flex justify-between mt-2 sm:mx-4">
				<h1 className="px-4 py-2 bg-purple-200 rounded-md">{group}</h1>
				<DatePicker date={date} onChangeDate={handleDateChange} />
			</div>

			{isPending && <h1 className="mx-auto my-2">Loading...</h1>}
			{!isPending && (
				<div className="flex flex-col items-center">
					{classes.length == 0 && <h1>No classes! let's gooo!!!! </h1>}
					{classes.map((class_item) => {
						return (
							<ClassCard
								key={class_item.id}
								name={class_item.course_name!}
								professor={class_item.professor!}
								location={class_item.location!}
								time={slotToTime[class_item.slot || 0]}
								flag={false}
							/>
						);
					})}
				</div>
			)}
		</>
	);
}
