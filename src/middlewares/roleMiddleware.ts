import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    res.status(403).json({ error: "Access denied" });
    return;
  }
  next();
};
