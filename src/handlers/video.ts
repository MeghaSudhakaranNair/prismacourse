import { validationResult } from "express-validator";
import prisma from "../db";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const addVideo = async (req: any, res: any) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const video = await prisma.video.create({
      data: {
        title: req.body.title,
        desc: req.body.desc,
        url: req.body.url,
        videoDetails: {
          create: {
            key: req.body.key,
            metadata: req.body.metadata,
            url: req.body.descurl,
          },
        },
      },
      include: { videoDetails: true },
    });
    return res.status(201).json(video);
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

export const getVideo = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const video = await prisma.video.findMany({
    include: { videoDetails: true },
  });

  return res.status(200).json(video);
};
