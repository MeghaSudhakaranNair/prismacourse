import { validationResult } from "express-validator";
import prisma from "../db";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: any, res: any) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const course = await prisma.user.create({
      data: {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
        ...(req.body.courseId && {
          course: {
            connect: [
              { id: req.body.courseId }, // make sure courseId is passed in the body
            ],
          },
        }),
      },
    });
    return res.status(201).json(course);
  } catch (error) {
    // Handle Prisma errors

    if (error instanceof PrismaClientValidationError) {
      console.log("error", error);
      return res.status(400).json({
        error: "Prisma Validation Error",
        message: error.message,
      });
    }
  }
};

export const loginUser = async (req: any, res: any) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    console.log(user);
    const matched = bcrypt.compareSync(req.body.password, user.password);

    if (matched) {
      const token = jwt.sign(
        { id: user.id },
        process.env.WEB_TOKEN_SECRET as string,
        { expiresIn: "2d" }
      );
      return res
        .status(200)
        .json({ message: "User fetched successfully", token: token });
    }
    return res.status(401).json({ message: "Invalid password" });
  } catch (error) {
    // Handle Prisma errors

    if (error instanceof PrismaClientValidationError) {
      console.log("error", error);
      return res.status(400).json({
        error: "Prisma Validation Error",
        message: error.message,
      });
    }
  }
};
/**
 * @param req
 * @param res
 */
export const privateRoute = async (req: any, res: any) => {
  console.log(req.user);
  return res.json({ msg: "Authenticated route" });
};
