import DayDropdown from "@/components/DayDropdown";
import Timetable from "@/components/Timetable";
import { getClasses } from "@/actions/classes";

export default async function Home() {
	const { ok, classes, group } = await getClasses(new Date());

	if (!ok) {
		return <h1>hell nah !Some error occured!</h1>;
	}

	if (!classes) {
		return <h1>Oops</h1>;
	}
	if (!group) {
		return <h1>No group found!</h1>;
	}

	return (
		<div className="p-2">
			<Timetable initialClasses={classes} group={group} />
		</div>
	);
}
