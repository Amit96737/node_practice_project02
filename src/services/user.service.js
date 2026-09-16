import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

import { db } from "../db/index.js";
import { users } from "../db/schema/user.schema.js";

import { profiles } from "../db/schema/profile.schema.js";
import { generateUsername } from "../utils/generateUsername.js";

export const createUser = async ({
    firstName,
    lastName,
    email,
    password,
    address,
    pincode,
    bio,
}) => {

    return await db.transaction(async (tx) => {

        const existingUser = await tx
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

        const [user] = await tx
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

        let username;

        for (let attempt = 0; attempt < 10; attempt++) {

            const candidate = generateUsername(
                firstName,
                lastName
            );

            const [existingProfile] = await tx
                .select({
                    id: profiles.id,
                })
                .from(profiles)
                .where(eq(profiles.username, candidate))
                .limit(1);

            if (!existingProfile) {
                username = candidate;
                break;
            }
        }

        if (!username) {
            throw new Error("USERNAME_GENERATION_FAILED");
        }

        const [profile] = await tx
            .insert(profiles)
            .values({
                userId: user.id,
                username,
                nickname: firstName,
                address: address ?? null,
                pincode: pincode ?? null,
                bio: bio ?? null,
            })
            .returning({
                id: profiles.id,
                userId: profiles.userId,
                username: profiles.username,
                nickname: profiles.nickname,
                address: profiles.address,
                pincode: profiles.pincode,
                bio: profiles.bio,
                createdAt: profiles.createdAt,
                updatedAt: profiles.updatedAt,
            });

        return {
            user,
            profile,
        };
    });
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