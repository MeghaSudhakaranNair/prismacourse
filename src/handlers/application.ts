import { validationResult } from "express-validator";
import prisma from "../db";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { application } from "express";

export const addApplication = async (req: any, res: any) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const customer = await prisma.customer.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        address: {
          create: {
            zip: req.body.zip,
            country: req.body.country,
            city: req.body.city,
          },
        },
        application: {
          create: {
            type: req.body.type,
            tenure: req.body.tenure,
            amount: req.body.amount,
          },
        },
      },
    });
    return res.status(201).json(customer);
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
