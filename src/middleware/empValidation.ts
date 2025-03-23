import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

export function empValidator() {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.empCredentials = _.pick(req.body, ['email', 'password', 'compName', 'compDomain', 'compLocations']),
            next();
        } catch (error) {
            res.status(400).json({msg: 'Missing fields.', err: error})
        }
    }
}