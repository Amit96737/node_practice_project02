import { createUser as createUserService,
        loginUser as loginUserService,
} from "../services/user.service.js";

export const createUser = async (req, res) => {
    try {

        const {
            first_name,
            last_name,
            email,
            password,
            address,
            pincode,
            bio,
        } = req.body || {};


        const result = await createUserService({
            firstName: first_name,
            lastName: last_name,
            email: email.toLowerCase().trim(),
            password,
            address,
            pincode,
            bio,
        });


        return res.status(201).json({
        success: true,
        message: "User created successfully",

        user_details: {
            ...result.user,

            profileId: result.profile.id,
            username: result.profile.username,
            nickname: result.profile.nickname,
            address: result.profile.address,
            pincode: result.profile.pincode,
            bio: result.profile.bio,
            profileCreatedAt: result.profile.createdAt,
            profileUpdatedAt: result.profile.updatedAt,
        },
    });

    } catch (error) {

        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }


        if (error.message === "USERNAME_GENERATION_FAILED") {
            return res.status(500).json({
                success: false,
                message: "Unable to generate username",
            });
        }


        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const loginUser = async (req, res) => {
    try {

        const {
            email,
            password,
        } = req.body || {};

        const user = await loginUserService({
            email: email.toLowerCase().trim(),
            password,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: user,
        });

    } catch (error) {

        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};