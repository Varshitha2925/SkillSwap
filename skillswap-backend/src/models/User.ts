import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'skills' }],
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
