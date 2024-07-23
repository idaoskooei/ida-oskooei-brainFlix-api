const express = require('express');
const app = express();
const videos = require('./routes/videos');
const cors = require('cors');

require('dotenv').config();
const {PORT} = process.env;

app.use(cors());

app.use(express.json());

app.use("/public", express.static('./public/images'))

app.get('/', (_req, res) => {
    res.send("request received")
})

app.use('/videos', videos)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})