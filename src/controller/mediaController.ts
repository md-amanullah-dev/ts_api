import { Request, Response } from 'express';
import File from '../model/mediaModel';

const mediaFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const savedFile = await File.create({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      mimeType: file.mimetype,
      size: file.size
    });

    res.status(201).json({
      message: 'File uploaded successfully',
      file: savedFile,
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`

    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
};


export default {mediaFile};
