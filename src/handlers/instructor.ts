import { validationResult } from "express-validator";
import prisma from "../db";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const addInstructor = async (req: any, res: any) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const course = await prisma.instructor.create({
      data: {
        email: req.body.email,
        name: req.body.name,
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
