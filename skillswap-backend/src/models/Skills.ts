import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: { type: Array, ref: 'User', required: true },
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);