import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skill_id: { type: String },
  level: { type: String },
  userId: { type: String, ref: 'User', required: true },
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);