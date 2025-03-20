import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function verifyToken() {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                res.status(401).json({error: "Access Denied"});
                return;
            }

            const verified = jwt.verify(token, process.env["JWT_SECRET"]!)
            next();
        } catch (error) {
            res.status(401).json({"Auth Error": "Access Denied"});
        }
    }
}