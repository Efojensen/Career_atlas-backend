import mongoose from 'mongoose';

export const employerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    orgName: {
        type: String,
        required: true,
    },
    orgDomain: {
        type: String,
    },
    orgLocations: {
        type: [String],
    },
});