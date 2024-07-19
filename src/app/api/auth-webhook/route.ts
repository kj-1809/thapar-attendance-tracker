import { NextResponse } from "next/server";
import prisma from "@/lib/db"

export async function POST(req: Request) {
	const body = await req.json()

	try {
		await prisma.user.create({
			data: {
				id: body.data.id,
				email: body.data.email_addresses[0].email_address,
				name: body.data.first_name + " " + body.data.last_name,
				currentGroup: "unknown",
			}
		})
	}catch(err){
		return NextResponse.json({ok: false}, {status: 500})
	}
	return NextResponse.json({ ok: true }, { status: 200 })
}
