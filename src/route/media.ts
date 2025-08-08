import express from 'express';
import upload from '../middleware/upload';
import Media from '../controller/mediaController';

const router = express.Router();

router.post('/media/upload', upload.single('file'), Media.mediaFile);

export default router;
