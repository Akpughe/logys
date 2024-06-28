DO $$ BEGIN
 CREATE TYPE "public"."account_plan" AS ENUM('STARTER', 'PROFESSIONAL', 'PREMIUM');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"phone" varchar(256),
	"email" varchar,
	"company_identification_number" numeric(5),
	"language" text,
	"location" text,
	"logo" text,
	"account_plan" "account_plan",
	"country" text,
	"phone_code" text,
	"currency" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dispatcher" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text,
	"phone" varchar(256),
	"company_id" uuid,
	"company_identification_number" numeric,
	"city" text,
	"logo" text,
	"country" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
DROP TABLE "users";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "full_name_idx" ON "dispatcher" USING btree ("full_name");