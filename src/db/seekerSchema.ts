import mongoose from 'mongoose';

const seekerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    student: {
        type: Boolean,
        default: true,
        required: true,
    },
    profile_pic: {
        type: String
    },
    preferredJobType: {
        type: String,
    },
    degrees: {
        type: String,
    },
    yearsOfExperience: {
        type: Number,
    },
    resume: {
        type: String,
    },
    skills: {
        type: [String],
    }
});

const seekerModel = mongoose.model('JobSeeker', seekerSchema);
export default seekerModel;