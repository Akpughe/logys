import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  serial,
  text,
  varchar,
  uniqueIndex,
  timestamp,
  uuid,
  numeric,
  json,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const dispatcher = pgTable(
  "dispatcher",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    fullName: text("full_name"),
    phone: varchar("phone", { length: 256 }),
    companyId: uuid("company_id"),
    companyIdentificationNumber: numeric("company_identification_number"),
    companyName: text("full_name"),
    city: text("city"),
    logo: text("logo"),
    country: text("country"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (users) => {
    return {
      fullNameIndex: uniqueIndex("full_name_idx").on(users.fullName),
    };
  }
);

export const accountTypeEnum = pgEnum("account_plan", [
  "STARTER",
  "PROFESSIONAL",
  "PREMIUM",
]);

export const userRoleEnum = pgEnum("user_role", ["OWNER", "ADMIN", "STAFF"]);

export const company = pgTable(
  "company",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").unique(),
    phone: varchar("phone", { length: 256 }).unique(),
    email: varchar("email").unique(),
    companyIdentificationNumber: numeric("company_identification_number", {
      precision: 5,
    }),
    language: text("language"),
    location: text("location"),
    logo: text("logo"),
    accountPlan: accountTypeEnum("account_plan"),
    country: text("country"),
    phoneCode: text("phone_code"),
    currency: json("currency").$type<{ symbol: string; moneyCode: string }>(),
  },
  (companies) => {
    return {
      companyNameIndex: uniqueIndex("company_name_idx").on(companies.name),
    };
  }
);

export const staff = pgTable(
  "staff",
  {
    companyId: uuid("company_id"),
    name: text("name"),
    phone: varchar("phone"),
    email: text("email"),
    userRole: userRoleEnum("user_role"),
  },
  (staff) => {
    return {
      staffIdIndex: uniqueIndex("staff_id_idx").on(staff.companyId, staff.name),
    };
  }
);

export const rider = pgTable(
  "rider",
  {
    id: uuid("rider_id").defaultRandom().primaryKey(),
    name: text("name"),
    imageUrl: text("image_url"),
    assignedOrder:
      json("assigned_order").$type<
        Array<{ orderId: string; status: string }>
      >(),
    onShift: boolean("on_shift"),
    companyName: text("company_name"),
    city: text("city"),
    logo: text("logo"),
    accountPlan: accountTypeEnum("account_plan"),
    country: text("country"),
  },
  (riders) => {
    return {
      riderIdIndex: uniqueIndex("rider_id_idx").on(riders.name),
    };
  }
);

export const order = pgTable(
  "order",
  {
    id: uuid("order_id").defaultRandom().primaryKey(),
    orderStatus: text("order_status"),
    assignedCarrier: json("assigned_carrier").$type<{
      name: string;
      id: string;
    }>(),
    orderNumber: text("order_number"),
    trackingLink: text("tracking_link"),
    businessName: text("business_name"),
    distanceBetweenPickUpAndDeliveryLocation: numeric(
      "distance_between_pickup_and_delivery_location"
    ),
    costInfo: json("cost_info").$type<{
      total_cost: number;
    }>(),
    feedbackDetails: text("feedback_details"),
    orderDateTimeInfo: json("order_date_time_info").$type<{
      expectedPickUpTime: string;
      placementTime: string;
      expectedDeliveryDate: string;
      expectedDeliveryTime: string;
    }>(),
    customer: json("customer").$type<{ address: string; name: string }>(),
  },
  (orders) => {
    return {
      orderIdIndex: uniqueIndex("order_id_idx").on(orders.id),
    };
  }
);
