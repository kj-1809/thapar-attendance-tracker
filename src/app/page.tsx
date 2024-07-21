import DayDropdown from "@/components/DayDropdown";
import Timetable from "@/components/Timetable";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { getClasses } from "@/actions/classes";

export default async function Home() {
	const { ok, classes, group} = await getClasses(new Date().getDay());

	if (!ok) {
		return <h1>hell nah !Some error occured!</h1>;
	}

	if (!classes) {
		return <h1>Oops</h1>;
	}

	return (
		<div className="p-2">
			<Timetable initialClasses={classes} group = {group}/>
		</div>
	);
}
