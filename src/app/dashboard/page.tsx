import DashboardCard from "@/components/DashboardCard";

export default function Dashboard() {
	return (
		<div>
			<div className="flex justify-center">
				<h1 className="text-3xl mt-8">Dashboard</h1>
			</div>
			<div>
				<DashboardCard title="haha" value={10} total={100} />
			</div>
		</div>
	);
}
