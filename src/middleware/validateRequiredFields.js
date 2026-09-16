export const validateRequiredFields = (requiredFields) => {
    return (req, res, next) => {

        const missingFields = requiredFields.filter(
            (field) => !req.body?.[field]
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `${missingFields.join(", ")} field(s) are required`,
            });
        }

        next();
    };
};