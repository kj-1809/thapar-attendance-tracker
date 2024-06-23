import DashboardCard from "@/components/DashboardCard";

export default function Dashboard() {
	return (
		<div>
			<div className="flex justify-center">
				<h1 className="text-3xl mt-8 font-semibold">Dashboard</h1>
			</div>
			<div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 p-6">
				<DashboardCard title="haha" value={11.2} total={100} />
				<DashboardCard title="haha" value={100} total={100} />
				<DashboardCard title="haha" value={10} total={100} />
				<DashboardCard title="haha" value={75} total={100} />
				<DashboardCard title="haha" value={76} total={100} />
			</div>
		</div>
	);
}
