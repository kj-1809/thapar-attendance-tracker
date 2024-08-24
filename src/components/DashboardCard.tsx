"use client";
import React from "react";
import Progress from "react-circle-progress-bar";
import { codeToName } from "@/lib/mappings";

export default function DashboardCard({ title, value, total }: any) {
	let percentage = 0;
	if (!(value == 0 && total == 0)) {
		percentage = (value / total) * 100;
	}
	return (
		<div className="rounded-xl flex p-2 shadow-lg justify-center flex-col items-center">
			<Progress
				progress={percentage}
				strokeWidth={15}
				subtitle={title}
				className="inline-block"
				transiitionDuration={1}
				gradient={
					percentage < 75
						? [
							{ stop: 0.0, color: "#dc2626" },
							{ stop: 1.0, color: "#ef4444" },
						]
						: [
							{ stop: 0.0, color: "#22c55e" },
							{ stop: 1.0, color: "#22c55e" },
						]
				}
			/>
			<h1>{title}</h1>
			<h1>{codeToName[title]}</h1>
			<h1>
				{value}/{total}
			</h1>
		</div>
	);
}
