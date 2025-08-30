import { Request, Response, NextFunction, response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: {id: string};
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];   // Bearer TOKEN

    if (!token){
        return res.status(401).json({message: "No token provided"});
    }

    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secretKey"
        ) as {id: string};

        req.user = decoded;
        
        next();

    }catch(error){
        return res.status(401).json({message: "Invalid token"});
    }
}