import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  "postgres://postgres.fpjodkhkrsumcjsrikhn:b6jBSJG9_QdvTrm@aws-0-eu-central-1.pooler.supabase.com:6543/postgres";

export const client = postgres(connectionString);
// export const db = drizzle(client);

export const db = drizzle(client, { schema });
