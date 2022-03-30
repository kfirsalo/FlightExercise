import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import tripRouter from './routes/trip/index.js'

mongoose.connect(`${config.db.name}://${config.db.host}:${config.db.port}/database2`)


const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/trip', tripRouter);

const PORT = process.env.PORT || config.app.port;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));