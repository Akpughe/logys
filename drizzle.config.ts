import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "aws-0-eu-central-1.pooler.supabase.com",
    user: "postgres.fpjodkhkrsumcjsrikhn",
    password: "b6jBSJG9_QdvTrm",
    database: "postgres",
  },
});
