import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/User";
import { Password } from "../utils/password";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) throw new BadRequestError("Email in use");

  const user = User.build({ email, password });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!
  );

  req.session = { jwt: userJwt };

  res.status(201).send(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new BadRequestError("Invalid credentials");
  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );
  if (!passwordsMatch) throw new BadRequestError("Invalid Credentials");

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!
  );
  // Store it on session object
  req.session = {
    jwt: userJwt,
  };
  res.send(existingUser);
};

export const getCurrentUser = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export const logout = async (req: Request, res: Response) => {
  req.session = null;
  res.send({});
};
