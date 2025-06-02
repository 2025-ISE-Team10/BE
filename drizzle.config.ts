import { defineConfig } from "drizzle-kit";

import env from "@/env";

// DATABASE_URL이 file:로 시작하면 sqlite, 아니면 postgresql
const isSqlite = env.DATABASE_URL.startsWith("file:");
const dialect = isSqlite ? "sqlite" : "postgresql";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
