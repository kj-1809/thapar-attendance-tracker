import DashboardCard from "@/components/DashboardCard";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { codeToName } from "@/lib/mappings";
export default async function Dashboard() {
	const { userId } = auth();
	if (!userId) {
		return <h1>Login!</h1>;
	}

	const takenClasses = await prisma?.takenClass.findMany({
		where: {
			userId,
		},
	});

	return (
		<div>
			<div className="flex justify-center">
				<h1 className="text-3xl mt-8 font-semibold">Dashboard</h1>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 p-6">
				{takenClasses.map((takenClass) => {
					return (
						<DashboardCard
							title={takenClass.name}
							value={takenClass.present}
							total={takenClass.present + takenClass.absent}
						/>
					);
				})}
			</div>
		</div>
	);
}
