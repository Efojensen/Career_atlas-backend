import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function verifyToken() {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                res.status(401).json({ error: "Access Denied" });
                return;
            }

            jwt.verify(token, process.env["JWT_SECRET"]!)
            next();
        } catch (error) {
            res.status(401).json({ "Auth Error": "Access Denied" });
        }
    }
};

export function empVerifyToken() {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({ error: 'Access Denied' })
            return;
        }

        try {
            jwt.verify(token, process.env['JWT_SECRET']!, (err, payload) => {
                if (err) return res.status(403).json({ msg: 'Forbidden', error: err });

                if (!payload) return res.status(500).json({ msg: 'Something went wrong' });

                if (typeof payload === 'object' && payload !== null && 'empId' in payload) {
                    req.jobData.empId = payload.empId
                    next()
                }
            })
        } catch (error) {
            res.status(500).json({ msg: 'Something went wrong', err: error })
        }
    }
}