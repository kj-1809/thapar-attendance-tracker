import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className = "flex justify-center mt-10 sm:mt-16">
			<SignIn />
		</div>
	);
}
