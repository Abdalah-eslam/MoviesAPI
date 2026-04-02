export const validateRequestBody = (schema) => {
    return (req, res, next) => {
    const result= schema.safeParse(req.body);
    if (result.error) {
        return res.status(400).json({message:"error", errors: result.error.issues });
    }
    next();
    };
};