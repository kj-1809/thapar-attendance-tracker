import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function DayDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className = "shadow-md rounded-md px-4 py-2 outline-none">
				<div className="flex gap-1">
					Monday <ChevronDown />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Select Day</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Monday</DropdownMenuItem>
				<DropdownMenuItem>Tuesday</DropdownMenuItem>
				<DropdownMenuItem>Wednesday</DropdownMenuItem>
				<DropdownMenuItem>Thursday</DropdownMenuItem>
				<DropdownMenuItem>Friday</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
