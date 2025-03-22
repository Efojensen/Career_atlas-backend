import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function verifyToken() {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                res.status(401).json({error: "Access Denied"});
                return;
            }

            jwt.verify(token, process.env["JWT_SECRET"]!)
            next();
        } catch (error) {
            res.status(401).json({"Auth Error": "Access Denied"});
        }
    }
}