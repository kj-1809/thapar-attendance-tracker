import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import DayDropdown from "@/components/DayDropdown";
import Timetable from "@/components/Timetable";
export default function Home() {
	return (
		<div className="p-2">
			<div className="flex justify-between mt-2">
				<h1 className="px-4 py-2 bg-purple-200 rounded-md">1B18</h1>
				<DayDropdown />
			</div>

			<Timetable />
		</div>
	);
}
