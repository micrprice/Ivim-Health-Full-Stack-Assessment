import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/notes', noteRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
