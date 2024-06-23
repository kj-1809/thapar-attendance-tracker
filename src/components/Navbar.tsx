import ProfileDropdown from "@/components/ProfileDropdown";
import Link from "next/link";
export const Navbar = () => {
	return (
		<div className="h-16 bg-purple-200 sticky w-full overflow-hidden top-0 flex justify-between items-center px-2">
			<Link href = "/">
				<h1 className="font-semibold">Trackit</h1>
			</Link>
			<ProfileDropdown />
		</div>
	);
};
