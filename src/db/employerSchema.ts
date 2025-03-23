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
    compName: {
        type: String,
        required: true,
    },
    compDomain: {
        type: String,
    },
    compLocations: {
        type: [String],
    },
});

const employerModel = mongoose.model('Employer', employerSchema);
export default employerModel;