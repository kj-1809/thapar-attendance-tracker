"use client";
import { useState } from "react";
import { GroupSelector } from "./GroupSelector";
export function GroupSelectorClient({ data }: { data: { name: string }[] }) {
	const [selectedGroup, setSelectedGroup] = useState("");

	function handleGroupSelect(value: string) {
		setSelectedGroup(value);
	}

		

	return (
		<div className = "flex flex-col items-center">
			<GroupSelector
				value={selectedGroup}
				data={data}
				onGroupSelect={handleGroupSelect}
			/>

			<button className="px-4 py-2 rounded-md bg-purple-200 mt-5" onClick = {}>
				Submit
			</button>
		</div>
	);
}
