import { Request, Response, NextFunction } from "express";
import { VerifyToken } from "../utils/Token";

export const protect = (req:Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: "Accesss denied, no token provided."});
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = VerifyToken(token);

    if(!decoded){
        return res.status(401).json({message: "invalid token or expired token"});
    }

    (req as any).user = decoded;

    next();
};