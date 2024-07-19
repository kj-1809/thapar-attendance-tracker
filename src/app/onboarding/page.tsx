import { auth } from "@clerk/nextjs/server";
import { GroupSelector } from "@/components/GroupSelector"
import prisma from "@/lib/db"

export default async function OnboardingPage() {
	const {userId} = auth()
	if(!userId){
		return <h1>Login first</h1>
	}
	
	const data = await prisma.class_group.findMany();

	return (
		<div className="flex flex-col items-center justify-center mt-10">
			<h1 className="text-2xl my-5">Select Your Group</h1>
			<GroupSelector data = {data}/>
			<button className="px-4 py-2 rounded-md bg-purple-200 mt-5">
				Submit
			</button>
		</div>
	);
}
