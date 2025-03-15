import express from "express";
import mongoose from "mongoose";
import jobRoutes from './routes/jobs';
import userRoutes from './routes/users';

const PORT = 3000;
const app = express();

async function connectToDB () {
    try {
        await mongoose.connect(process.env["DATABASE_URL"]!);
        console.log('Connection to Db successful')
    } catch (error) {
        console.log(error);
    }
}

app.use('/jobs', jobRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    connectToDB();
    console.log("Server running on http://localhost:" + PORT);
})