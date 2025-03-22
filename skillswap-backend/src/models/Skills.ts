import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, ref: 'User', required: true },
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);