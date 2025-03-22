import jobModel from '../../db/jobSchema';
import { Request, Response } from 'express';

export async function createJob(req: Request, res: Response) {
    try {
        const data = req.jobData;

        const newJob = new jobModel({
            pay: data.pay,
            jobName: data.jobName,
            jobType: data.jobType,
            benefits: data.benefits,
            jobImage: data.jobImage,
            jobCategory: data.jobCategory,
            jobLocations: data.jobLocations,
            jobDescription: data.jobDescription,
        });

        const savedJob = await newJob.save();

        res.status(201).json({
            createdJob: savedJob
        });
    } catch (error) {
        res.status(500).json({
            err: error
        })
    }
}

export async function getAllJobs(req: Request, res: Response) {
    const jobs = await jobModel.find();

    res.status(200).json({jobs: jobs})
}