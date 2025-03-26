import path from 'path';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jobRoutes from './routes/jobs';
import userRoutes from './routes/users';
import empRoutes from './routes/employer';

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(PORT, () => {
    connectToDB();
    console.log("Server running on http://localhost:" + PORT);
})