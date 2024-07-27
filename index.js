import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import videos from './routes/videos.js';

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use('/public', express.static('./public/images'));

app.get('/', (_req, res) => {
    res.send('request received');
});

app.use('/videos', videos);

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
