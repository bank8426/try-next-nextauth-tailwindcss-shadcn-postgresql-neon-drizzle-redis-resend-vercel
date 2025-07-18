import { config as dotenvConfig } from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenvConfig({ path: ".env.local" });

export default defineConfig({
  out: "./drizzle",
  schema: "./database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
