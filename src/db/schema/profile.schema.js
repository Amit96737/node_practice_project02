import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./user.schema.js";

export const profiles = pgTable("profiles", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .unique()
        .references(() => users.id, {
            onDelete: "cascade",
        }),

    username: varchar("username", {
        length: 100,
    })
        .notNull()
        .unique(),

    nickname: varchar("nickname", {
        length: 100,
    }).notNull(),

    address: text("address"),

    pincode: varchar("pincode", {
        length: 20,
    }),

    bio: text("bio"),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
});