
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import auth from './route/auth';  
import role from './route/role';  
import user from './route/user';  
import restaurant from './route/resturant';  
import media from './route/media';  

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// Static folder setup
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api', auth);
app.use('/api', role);
app.use('/api', user);
app.use('/api', restaurant);
app.use('/api', media);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

export default app;
