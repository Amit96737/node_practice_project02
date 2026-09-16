import express from "express";

import { validateRequiredFields } from "../middleware/validateRequiredFields.js";

import { createUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/sign-up",
    validateRequiredFields([
        "first_name",
        "last_name",
        "email",
        "password"
    ]), createUser);
    
router.post("/sign-in",
    validateRequiredFields([
        "email",
        "password"
    ]), loginUser);

export default router;