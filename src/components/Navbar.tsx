import ProfileDropdown from "@/components/ProfileDropdown";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
export const Navbar = () => {
	

	return (
		<div className="h-16 bg-purple-200 sticky w-full overflow-hidden top-0 flex justify-between items-center px-2">
			<Link href="/">
				<h1 className="font-semibold">Trackit</h1>
			</Link>
			<SignedIn>
				<ProfileDropdown />
			</SignedIn>
			<SignedOut>
				<Link href = "/sign-in">
					<h1 className = "mr-2 px-4 py-2 rounded-md shadow-md font-mono">Login</h1>
				</Link>
			</SignedOut>
		</div>
	);
};
