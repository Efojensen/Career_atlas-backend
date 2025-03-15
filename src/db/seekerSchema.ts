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
});

const seekerModel = mongoose.model('JobSeeker', seekerSchema);
export default seekerModel;