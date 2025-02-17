import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid("user", "admin").required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};
