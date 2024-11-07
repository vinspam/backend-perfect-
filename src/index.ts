import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import path from 'path';

import RootRouter from './root.router';

import { ALLOW_HOSTS, FILE_FOLDER, PORT } from './config';
import logger from './middleware/logger';
import authorize from './middleware/authorize';
import { errorHandler, routeNotFound } from './middleware/errorHandler';

const app = express();

app.use(
  cors({
    origin: ALLOW_HOSTS,
    methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', logger, authorize, new RootRouter().router);
app.use('/static/images/avatars', express.static(path.join(__dirname, '../../', FILE_FOLDER, 'avatars')));
app.use('/static/images/plans/', express.static(path.join(__dirname, '../../', FILE_FOLDER, 'plans')));
app.use(
  '/static/images/workoutThumbnail/',
  express.static(path.join(__dirname, '../../', FILE_FOLDER, 'workoutThumbnail'))
);
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.use([routeNotFound, errorHandler]);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
