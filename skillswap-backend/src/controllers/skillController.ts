import e, { NextFunction, Request, RequestHandler, Response } from 'express';
import Skills from '../models/Skills';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const addSkill = async (req: Request, res: Response) => {
  try {
    const { name, userId } = req.body;
    console.log("Skill Name",name);
    console.log("User ID",userId);

    let skill = await Skills.findOne({ name: name });

    if (skill) {
      // Skill exists, add user if not already in the array
      if (!skill.users.includes(userId)) {
        skill.users.push(userId);
        await skill.save();
      }
    } else {
      // Create new skill
      console.log("Creating new skill");
      const userList = [userId];
      console.log("User List",userList);
      skill = new Skills({ name: name, users: userList });
      console.log("Skill",skill);

      await skill.save();
    }

    res.status(200).json({ message: 'Skill added successfully', skill });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getSkill: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    const skills = await Skills.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
