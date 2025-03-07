import express from "express";
import jobRoutes from './routes/jobs';
import userRoutes from './routes/users';

const PORT = 3000;
const app = express();

app.use('/jobs', jobRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
})