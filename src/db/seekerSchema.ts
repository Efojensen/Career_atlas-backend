import mongoose from 'mongoose';

export const seekerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
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