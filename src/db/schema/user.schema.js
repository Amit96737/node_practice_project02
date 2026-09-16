import {
    pgTable,
    uuid,
    varchar,
    boolean,
    timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),

    firstName: varchar("first_name", {
        length: 100,
    }).notNull(),

    lastName: varchar("last_name", {
        length: 100,
    }).notNull(),

    email: varchar("email", {
        length: 255,
    }).notNull().unique(),

    password: varchar("password", {
        length: 255,
    }).notNull(),

    emailVerified: boolean("email_verified")
        .notNull()
        .default(false),

    status: varchar("status", {
        length: 20,
    })
        .notNull()
        .default("active"),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
});