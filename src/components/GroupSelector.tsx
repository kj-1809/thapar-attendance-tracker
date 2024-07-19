"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

// const frameworks = [
// 	{
// 		value: "next.js",
// 		label: "Next.js",
// 	},
// 	{
// 		value: "sveltekit",
// 		label: "SvelteKit",
// 	},
// 	{
// 		value: "nuxt.js",
// 		label: "Nuxt.js",
// 	},
// 	{
// 		value: "remix",
// 		label: "Remix",
// 	},
// 	{
// 		value: "astro",
// 		label: "Astro",
// 	},
// ];

export function GroupSelector({ data }: { data: { name: string }[]}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	console.log(value)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? data.find((item) => item.name === value)?.name
						: "Select Group..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search Group..." />
					<CommandEmpty>No groups found.</CommandEmpty>
					<CommandGroup>
						{data.map((item) => (
							<CommandList key={item.name}>
								<CommandItem
									key={item.name}
									value={item.name}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === item.name ? "opacity-100" : "opacity-0",
										)}
									/>
									{item.name}
								</CommandItem>
							</CommandList>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
