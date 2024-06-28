DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('OWNER', 'ADMIN', 'STAFF');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"order_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_status" text,
	"assigned_carrier" json,
	"order_number" text,
	"tracking_link" text,
	"business_name" text,
	"distance_between_pickup_and_delivery_location" numeric,
	"cost_info" json,
	"feedback_details" text,
	"order_date_time_info" json,
	"customer" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rider" (
	"rider_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"image_url" text,
	"assigned_order" json,
	"on_shift" boolean,
	"company_name" text,
	"city" text,
	"logo" text,
	"account_plan" "account_plan",
	"country" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff" (
	"company_id" uuid,
	"name" text,
	"phone" varchar,
	"email" text,
	"user_role" "user_role"
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "order_id_idx" ON "order" USING btree ("order_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "rider_id_idx" ON "rider" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "staff_id_idx" ON "staff" USING btree ("company_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "company_name_idx" ON "company" USING btree ("name");--> statement-breakpoint
ALTER TABLE "company" ADD CONSTRAINT "company_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "company" ADD CONSTRAINT "company_phone_unique" UNIQUE("phone");--> statement-breakpoint
ALTER TABLE "company" ADD CONSTRAINT "company_email_unique" UNIQUE("email");