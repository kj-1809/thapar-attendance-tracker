import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db"
import { GroupSelectorClient } from "@/components/GroupSelectorClient";
import { permanentRedirect } from 'next/navigation'

export default async function OnboardingPage() {
	const {userId} = auth()
	if(!userId){
		return <h1>Login first</h1>
	}
	
	const userData = await prisma.user.findFirst({
		where: {
			id: userId
		}
	})
	console.log(userData)
	if(userData && !(userData?.currentGroup === "unknown")){
		permanentRedirect("/")
	}
	
	const data = await prisma.class_group.findMany();
	return (
		<div className="flex flex-col items-center justify-center mt-10">
			<h1 className="text-2xl my-5">Select Your Group</h1>
			<GroupSelectorClient data = {data}/>
		</div>
	);
}
