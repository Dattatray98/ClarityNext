import jwt from "jsonwebtoken";

// jwt token generation function
export const GenerateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
    });
};

// jwt token verification function - FIXED
export const VerifyToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        return null;
    }
};