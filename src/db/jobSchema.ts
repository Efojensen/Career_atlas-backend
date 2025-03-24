import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
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
        default: 'on-site',
    },
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employers',
        required: true,
    },
    timePosted: {
        type: Date,
        required: true,
        default: Date.now()
    },
    pay: {
        type: Number,
        required: true,
    },
    jobLocations: {
        type: [String],
    },
    jobCountry: {
        type: String,
        default: 'Ghana'
    }
});

const jobModel = mongoose.model('Job', jobSchema);
export default jobModel;