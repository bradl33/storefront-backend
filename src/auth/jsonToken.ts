import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateAccessToken(userId: number, username: string): string {
  return jwt.sign({ userId, username }, process.env.TOKEN_SECRET as string);
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): unknown {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err) => {
    if (err) return res.sendStatus(403);

    next(err);
  });
}

export function loggedInUserId(req: Request): unknown {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return null;
  }
  const decoded = jwt.decode(token, { complete: true }) as {
    payload: JwtPayload;
  };
  const loggedInUserId = decoded.payload.userId;

  return loggedInUserId;
}
