import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // should be hashed in real-world apps
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }
}, { timestamps: true });




const AcessUserModel = mongoose.model('AcessUser', userSchema);
export default AcessUserModel;