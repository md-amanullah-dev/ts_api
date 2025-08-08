import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  originalName: String,
  filename: String,
  path: String,
  mimeType: String,
  size: Number
}, { timestamps: true });

const Media = mongoose.model('media', fileSchema);
export default Media;
