import _ from 'lodash';
import { Request, Response, NextFunction } from 'express'

export function validateUsrData() {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.usrCredentials = _.pick(req.body, ['email', 'password', 'userName', 'student'])
            if (!req.usrCredentials.student) {
                req.usrCredentials.student = true
            }
            next()
        } catch (error) {
            res.status(400).json({err: error})
        }
    }
}