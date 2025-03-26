import jobModel from '../../db/jobSchema';
import cloudinary from '../../utils/cloudinary';
import { Request, Response } from 'express';

export async function createJob(req: Request, res: Response) {
    try {
        const data = req.jobData;

        if (!data) {
            res.status(500).json({ msg: "Data is empty" })
            return;
        }

        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }

        let benefits, locations;
        if (data.benefits !== null && typeof data.benefits === 'string') {
            benefits = data.benefits.split(',')
        }

        if (data.jobLocations !== null && typeof data.jobLocations === 'string') {
            locations = data.jobLocations.split(',')
        }

        const newJob = new jobModel({
            pay: data.pay,
            empId: data.empId,
            benefits: benefits,
            jobImage: result?.url,
            jobName: data.jobName,
            jobType: data.jobType,
            jobLocations: locations,
            jobCountry: data.country,
            jobCategory: data.jobCategory,
            jobDescription: data.jobDescription,
        });

        const savedJob = await newJob.save();

        res.status(201).json({
            createdJob: savedJob
        });
    } catch (error) {
        res.status(500).json({
            err: JSON.stringify(error)
        })
    }
}

export async function getAllJobs(req: Request, res: Response) {
    const jobs = await jobModel.find();

    res.status(200).json({ jobs: jobs })
}