import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

export function validateJobData() {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.jobData = _.pick(req.body, ['pay', 'jobName', 'jobType', 'jobImage', 'benefits', 'jobCategory', 'jobDescription', 'jobLocations', 'country']);
            next();
        } catch (error) {
            res.status(400).json({err: error})
        }
    }
}