import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

import { db } from "../db/index.js";
import { users } from "../db/schema/user.schema.js";

export const createUser = async ({
    firstName,
    lastName,
    email,
    password,
}) => {
    const existingUser = await db
        .select({
            id: users.id,
        })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (existingUser.length > 0) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
        .insert(users)
        .values({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })
        .returning({
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            emailVerified: users.emailVerified,
            status: users.status,
            createdAt: users.createdAt,
        });

    return user;
};

export const loginUser = async ({
    email,
    password,
}) => {

    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("INVALID_CREDENTIALS");
    }

    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        emailVerified: user.emailVerified,
        status: user.status,
        createdAt: user.createdAt,
    };
};