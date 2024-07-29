import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
	let body;
	try {
		body = await req.json();
	} catch (err) {
		return NextResponse.json({ ok: false }, { status: 400 });
	}
	try {
		await prisma.user.upsert({
			where: {
				id: body.data.id,
			},
			update: {
				email: body.data.email_addresses[0].email_address,
				name: body.data.first_name + " " + body.data.last_name,
			},
			create: {
				id: body.data.id,
				email: body.data.email_addresses[0].email_address,
				name: body.data.first_name + " " + body.data.last_name,
				currentGroup: "unknown",
			},
		});
	} catch (err) {
		return NextResponse.json({ ok: false }, { status: 500 });
	}
	return NextResponse.json({ ok: true }, { status: 200 });
}
