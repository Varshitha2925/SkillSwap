import e, { NextFunction, Request, RequestHandler, Response } from 'express';
import Skills from '../models/Skills';
import jwt from 'jsonwebtoken';

export const addSkill: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const { name, description } = req.body;

    const skill = await Skills.create({ name, description, userId: decoded.userId });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
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
