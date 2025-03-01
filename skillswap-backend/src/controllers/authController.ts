import e, { NextFunction, Request, RequestHandler, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

// Register User
export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(200).json({ message : 'User registered successfully' ,
    data : {
      id: user._id,
      name: user.name,
      email: user.email,}
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user }, 
      process.env.JWT_SECRET as string,  // Ensure this is defined
      { expiresIn: '60h' }
    );
    res.json({ token });
  } catch (error) {
    console.log(e)
    res.status(500).json({ message: 'Server error' });
  }
};
