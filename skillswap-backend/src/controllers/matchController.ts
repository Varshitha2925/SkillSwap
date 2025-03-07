import e, { NextFunction, Request, RequestHandler, Response } from 'express';
import User from '../models/User';


export const matchUsersBySkills = async (req: any, res: any) => {
  
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Find users who share at least one skill
  const matchedUsers = await User.find({
    _id: { $ne: userId }, // Exclude current user
    skills: { $in: user.skills }, // Match users with overlapping skills
  });

  // Calculate match score based on skill overlap
  const sortedMatches = matchedUsers.map((match) => ({
    user: match,
    matchScore: match.skills.filter(skill => user.skills.includes(skill)).length,
  })).sort((a, b) => b.matchScore - a.matchScore); // Sort by highest match score

  res.json({
    message: 'Matches found',
    data: sortedMatches});
};
