import express from 'express';
import mongoose from 'mongoose';
import jobRoutes from './routes/jobs';
import userRoutes from './routes/users';
import empRoutes from './routes/employer';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/emp', empRoutes);
app.use('/job', jobRoutes);
app.use('/user', userRoutes);

async function connectToDB () {
    try {
        await mongoose.connect(process.env["DATABASE_URL"]!);
        console.log('Connection to Db successful')
    } catch (error) {
        console.log(error);
    }
}

app.listen(PORT, () => {
    connectToDB();
    console.log("Server running on http://localhost:" + PORT);
})