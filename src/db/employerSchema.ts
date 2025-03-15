import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema({
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

const employerModel = mongoose.model('Employer', employerSchema);
export default employerModel;