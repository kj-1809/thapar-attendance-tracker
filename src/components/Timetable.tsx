"use client";
import React from "react";
import ClassCard from "./ClassCard";
import { DatePicker } from "@/components/DatePicker";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getClasses } from "@/actions/classes";
import LoadingSkeleton from "./LoadingSkeleton";
import { max } from "date-fns";
import {codeToName} from "@/lib/mappings"
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

  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes", date],
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
      // queryClient.invalidateQueries({queryKey : ["classes", date.getTime()]})
    }
  }

	console.log("classes : ")
	console.log(classes)

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
								markedAttendanceId={class_item.markedAttendanceId}
                date={date}
                slot={class_item.slot}
                type={class_item.type}
                class_name={codeToName[class_item.course_name!]}
              />
            );
          })}
        </div>
      )}
      <div className="flex justify-center flex-col items-center">
        <h1 className="mt-10 mx-auto">
          Designed and Developed by{" "}
          <a
            href="https://www.linkedin.com/in/krishna-jindal-672839274/"
            target="_blank"
          >
            <b>KJ</b>
          </a>
        </h1>
        <h3 className="text-center opacity-50 text-sm">
          Email : thapartrackit.kj1809@gmail.com (for complaints and
          suggestions)
        </h3>
      </div>
    </>
  );
}
