import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const videosFilePath = path.join(process.cwd(), 'data', 'videos.json');

const readVideosData = async () => {
    const data = await fs.readFile(videosFilePath);
    return JSON.parse(data);
};

const writeVideosData = async (data) => {
    await fs.writeFile(videosFilePath, JSON.stringify(data, null, 2));
};

router.get('/', async (req, res) => {
    try {
        const videos = await readVideosData();
        const summaryVideos = videos.map(({ id, title, image }) => ({ id, title, image }));
        res.json(summaryVideos);
    } catch (err) {
        res.status(500).send('Error reading video data');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const videos = await readVideosData();
        const video = videos.find(v => v.id === req.params.id);
        if (video) {
            res.json(video);
        } else {
            res.status(404).send('Video not found');
        }
    } catch (err) {
        res.status(500).send('Error reading video data');
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description} = req.body;
        const newVideo = {
            id: uuidv4(),
            views: Math.floor(Math.random() * 1000001).toLocaleString(),
            likes: Math.floor(Math.random() * 1000001).toLocaleString(),
            duration: "3:01",
            title,
            description,
            timestamp: Date.now(),
            image: '/public/images/video-thumbnail.jpg',
            comments: [
                {
                    "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
                    "name": "Noah Duncan",
                    "comment": "Your insights into the future of AI are enlightening! The intersection of technology and ethics is particularly thought-provoking. Keep us updated on the tech front!",
                    "likes": 0,
                    "timestamp": 1691731062000
                  },
                  {
                    "id": "091de676-61af-4ee6-90de-3a7a53af7521",
                    "name": "Terry Wong",
                    "comment": "This video is a fantastic overview of the AI landscape. Your ability to distill complex concepts into digestible content is impressive. Can't wait for more tech insights!",
                    "likes": 0,
                    "timestamp": 1691644662000
                  },
                  {
                    "id": "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
                    "name": "Janice Rodriguez",
                    "comment": "Your channel is my go-to source for staying updated on tech trends. The exploration of AI's future implications is both informative and exciting. Kudos on another excellent video!",
                    "likes": 1,
                    "timestamp": 1691558262000
                  }
            ]
        };
        const videos = await readVideosData();
        videos.push(newVideo);
        await writeVideosData(videos);
        res.status(201).json(newVideo);
    } catch (err) {
        res.status(500).send('Error saving video data');
    }
});

export default router;
