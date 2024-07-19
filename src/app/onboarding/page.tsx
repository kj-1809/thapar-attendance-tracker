import { auth } from "@clerk/nextjs/server";
import { GroupSelector } from "@/components/GroupSelector"

export default function OnboardingPage() {
	const {userId} = auth()
	return (
		<div className="flex flex-col items-center justify-center mt-10">
			<h1 className="text-2xl my-5">Select Your Group</h1>
			<GroupSelector />
			<button className="px-4 py-2 rounded-md bg-purple-200 mt-5">
				Submit
			</button>
		</div>
	);
}
