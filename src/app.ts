
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import auth from './route/auth';  
import role from './route/role';  
import user from './route/user';  

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', auth);
app.use('/api', role);
app.use('/api', user);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

export default app;
