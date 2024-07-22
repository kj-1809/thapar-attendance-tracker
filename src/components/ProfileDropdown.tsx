import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	LayoutDashboard,
	LogOut,
	Settings,
	User,
} from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default function ProfileDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="shadow-md p-4 outline-none rounded-full h-12 w-12"></DropdownMenuTrigger>
			<DropdownMenuContent>
				<Link href="/dashboard">
					<DropdownMenuItem>
						<LayoutDashboard />
						<h1 className="ml-2">Dashboard</h1>
					</DropdownMenuItem>
				</Link>
				<Link href="/settings">
					<DropdownMenuItem>
						<Settings />
						<h1 className="ml-2">Settings</h1>
					</DropdownMenuItem>
				</Link>
				<Link href="/user-profile">
					<DropdownMenuItem>
						<User />
						<h1 className="ml-2">My Account</h1>
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem>
					<LogOut />
					<div className = "ml-2">
						<SignOutButton />
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
