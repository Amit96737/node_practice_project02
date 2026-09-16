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
        } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await createUserService({
            firstName: first_name,
            lastName: last_name,
            email: email.toLowerCase().trim(),
            password,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });

    } catch (error) {
        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
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

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

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