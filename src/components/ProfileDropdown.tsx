import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LayoutDashboard, LogOut, Settings } from "lucide-react";

export default function ProfileDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="shadow-md rounded-md px-4 py-2 outline-none">
				<div className = "flex">
					Profile <ChevronDown />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<LayoutDashboard />
					<h1 className="ml-2">Dashboard</h1>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Settings />
					<h1 className="ml-2">Settings</h1>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<LogOut />
					<h1 className="ml-2">Logout</h1>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
