import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import videos from './routes/videos.js';

dotenv.config();

const app = express();
const { PORT } = process.env || 3000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(process.cwd(), 'public', 'images')));

app.use('/videos', videos);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
