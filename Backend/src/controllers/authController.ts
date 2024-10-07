import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import  User  from '../models/User';
import { generateToken } from '../utils/jwt';

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(username, email, password);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    newUser.save();

    res.status(201).json({ userId: newUser.id, token: generateToken(newUser.id) });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login a user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ where: { email } });
    if (!user) {
       res.status(404).json({ message: 'User not found' });
       return
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       res.status(400).json({ message: 'Invalid credentials' });
       return
    }

    
    const token = generateToken(user.id);

    res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
