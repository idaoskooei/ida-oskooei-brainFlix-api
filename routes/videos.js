const express = require('express');
const router = express.Router();
const fs = require('fs');
const uniqid = require('uniqid'); 

let videosArray = JSON.parse(fs.readFileSync('./data/videos.json'))

router.get('/', (_req, res) => {
    let videosList = [];
    videosArray.forEach(video => {
        const {id, title, channel, image} = video;
        let newVideo = {id, title, channel, image};
        videosList.push(newVideo);
    });
    res.json(videosList)
})

router.get('/:id', (req, res) => {
    const videoDetail = videosArray.find(video => video.id === req.params.id)
    res.json(videoDetail)
})

router.post('/', (req, res) => {
    const {title, description, image} = req.body;
    const newVideo = {
        title,
        channel: "ida",
        image,
        description,
        views: Math.floor(Math.random() * 1000001).toLocaleString(),
        likes: Math.floor(Math.random() * 1000001).toLocaleString(),
        duration: "4:01",
        video: "https://unit-3-project-api-0a5620414506.herokuapp.com/",
        timestamp: Date.now(),
        comments: [
            {
                "name": "Noah Duncan",
                "comment": "Your insights into the future of AI are enlightening! The intersection of technology and ethics is particularly thought-provoking. Keep us updated on the tech front!",
                "likes": 0,
                "timestamp": 1691731062000
                },
               {
                "name": "Terry Wong",
                "comment": "This video is a fantastic overview of the AI landscape. Your ability to distill complex concepts into digestible content is impressive. Can't wait for more tech insights!",                "likes": 0,
                "timestamp": 1691644662000
            },
            {
                "name": "Janice Rodriguez",
                "comment": "Your channel is my go-to source for staying updated on tech trends. The exploration of AI's future implications is both informative and exciting. Kudos on another excellent video!",
                "likes": 1,
                "timestamp": 1691558262000
                }
        ],
        id: uniqid()
    }
    videosArray.push(newVideo);
    const updatedVideosFile = fs.writeFileSync('./data/videos.json', JSON.stringify(videosArray));
    res.json(updatedVideosFile)
})

module.exports = router