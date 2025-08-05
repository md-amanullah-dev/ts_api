
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import auth from './route/auth';  // adjust the path if needed

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', auth);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

export default app;
