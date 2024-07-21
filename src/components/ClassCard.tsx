import { Check, X } from "lucide-react";
import React from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function ClassCard({
	name,
	professor,
	location,
	time,
	flag,
}: {
	name: string;
	professor: string;
	location: string;
	time: string;
	flag: boolean;
}) {
	return (
		<div className="rounded-xl p-4 shadow-md flex mt-4 justify-between max-w-[500px] w-full">
			<div className="flex">
				<div className="flex flex-col justify-center">
					<h1 className="text-6xl font-archivoBlack">{time.split(":")[0]}</h1>
					<h1 className="text-6xl font-archivoBlack">{time.split(":")[1]}</h1>
				</div>
				<div className="mx-4 h-32 w-1 bg-gray-300"></div>
				<div className="flex flex-col justify-center">
					<h1 className="text-xl">{name}</h1>
					<h1 className="text-xl">{location}</h1>
					<h1 className="text-xl">{professor}</h1>
				</div>
			</div>
			<div className="flex items-center">
				<div className="flex items-center">
					<Dialog>
						<DialogTrigger>
							<div className="rounded-full p-3 bg-green-100 m-2">
								<Check />
							</div>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Mark as Present ?</DialogTitle>
								<DialogDescription>
									This action cannot be undone.
								</DialogDescription>
							</DialogHeader>
							<button className="bg-green-300 px-4 py-2 rounded-md">
								Mark present
							</button>
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger>
							<div className="rounded-full p-3 bg-red-100 m-2">
								<X />
							</div>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Mark as Absent ?</DialogTitle>
								<DialogDescription>
									This action cannot be undone.
								</DialogDescription>
							</DialogHeader>
							<button className="bg-red-300 px-4 py-2 rounded-md">
								Mark absent
							</button>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</div>
	);
}
