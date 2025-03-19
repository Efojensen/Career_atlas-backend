import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({error: "Access Denied"});
        return;
    }

    try {
        const verified = jwt.verify(token, process.env["JWT_SECRET"]!)
        console.log(verified);
        // res.status(200).json({msg: 'Authorized'})
        next();
    } catch (error) {
        res.status(401).json({error: "Access Denied"});
    }
}