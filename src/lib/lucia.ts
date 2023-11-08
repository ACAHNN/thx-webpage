import { lucia } from "lucia";
import { astro } from "lucia/middleware";
//import { prisma } from "@lucia-auth/adapter-prisma";
//import { PrismaClient } from "@prisma/client";
//import { PrismaClient } from "@prisma/client/edge";

//const client = new PrismaClient();

import { libsql } from "@lucia-auth/adapter-sqlite";
import { createClient } from "@libsql/client";

const db = createClient({
	url: "file:test/main.db"
});

export const auth = lucia({
	env: import.meta.env.DEV ? "DEV" : "PROD",
	middleware: astro(),
	adapter: libsql(db, {
		user: "user",
		key: "user_key",
		session: "user_session"
	}),
	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

export type Auth = typeof auth;
