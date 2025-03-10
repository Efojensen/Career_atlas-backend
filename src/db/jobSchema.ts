import mongoose from 'mongoose';

export const jobSchema = new mongoose.Schema({
    jobName: {
        type: String,
        required: true,
    },
    jobCategory: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    jobImage: {
        type: String,
    },
    benefits: {
        type: [String],
    },
    jobType: {
        type: String,
        required: true,
    },
    timePosted: {
        type: Date,
        required: true,
    },
    pay: {
        type: Number,
        required: true,
    },
});