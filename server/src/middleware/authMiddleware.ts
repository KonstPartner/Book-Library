import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/config.ts';

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Token not provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, authConfig.jwtSecret) as {
      id: string;
      name: string;
    };
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token.' });
    return;
  }
};

export default authMiddleware;
