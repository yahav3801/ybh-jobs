import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "../data/env/server";
import * as schema from "@/src/drizzle/schema";

export const db = drizzle(env.DATABASE_URL, { schema });
