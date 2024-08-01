import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image"

export default function ProfileDropdown({
	name,
	imgUrl,
}: {
	name: string | null;
	imgUrl: string | null;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="shadow-md outline-none rounded-full h-[36px] w-[36px]">
				<Image
					src={imgUrl || ""}
					alt="profile-img"
					height={36}
					width={36}
					className="rounded-full"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Hi, {name}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Link href="/dashboard">
					<DropdownMenuItem>
						<LayoutDashboard />
						<h1 className="ml-2">Dashboard</h1>
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem>
					<LogOut />
					<div className="ml-2">
						<SignOutButton redirectUrl = "/sign-in"/>
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
