import type { APIRoute } from "astro";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const POST: APIRoute = async ({request}) => {
	const data = await request.json();
	const res = await prisma.lead.create({
		data: {
			email: data.email
		}
	})
	console.log(res)
	console.log(data.email)
	return new Response(JSON.stringify({ success: true }), { status: 200 });
};