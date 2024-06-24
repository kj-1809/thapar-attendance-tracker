import { ComboboxDemo } from "@/components/GroupSelector";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"

import {cn} from "@/lib/utils"
export default function Settings() {
	// <Button className = {cn("text-black",buttonVariants({variant : "outline"}))}>Confirm</Button>
	return (
		<div>
			<div className="flex justify-center">
				<h1 className="text-3xl mt-8 font-semibold">Settings</h1>
			</div>
			<div className="mt-8 flex flex-col items-center">
				<div className="flex items-center gap-8 my-2">
					<h1>Change group forever</h1>
					<ComboboxDemo />
				</div>
				<div className=  "flex items-center gap-8 my-2">
					<h1>Delete current attendance data</h1>
					<Dialog>
						<DialogTrigger>
							<div className="bg-red-500 px-4 py-2 rounded-md text-white">
								Delete
							</div>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Are you sure you want to delete your attendance record?
								</DialogTitle>
								<DialogDescription>
									This action cannot be undone.
								</DialogDescription>
							</DialogHeader>
							<button className="bg-red-500 px-4 py-2 rounded-md text-white">
								Delete
							</button>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</div>
	);
}
