import { validationResult } from "express-validator";
import prisma from "../db";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { createPaginator } from "prisma-pagination";
const paginate = createPaginator({});

export const getCourses = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const results = await paginate(
    prisma.course,
    {
      where: { instructorId: +req.params.instructorId },
      include: { Instructor: true, user: true },
      orderBy: { id: "asc" },
    },
    { page: +req.query.page, perPage: req.query.perPage }
  );

  return res.status(200).json(results);
};

export const addCourses = async (req: any, res: any) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("before try");
  try {
    const course = await prisma.course.create({
      data: {
        title: req.body.title,
        desc: req.body.desc,
        duration: req.body.duration,
        instructorId: req.body.instructorId,
      },
    });
    console.log(course);
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

export const fetchCourse = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const courses = await prisma.course.findUnique({
    where: { id: +req.params.id },
  });
  if (!courses) {
    return res.status(404).json({ err: "course not found" });
  }

  return res.status(200).json(courses);
};

export const deleteCourse = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const courses = await prisma.course.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!courses) {
    return res.status(404).json({ err: "course not found" });
  }
  const delresponse = await prisma.course.delete({
    where: { id: +req.params.id },
  });
  if (!delresponse) {
    return res.status(404).json({ err: "failed to delete course" });
  }

  return res.status(200).json(courses);
};

export const updateCourse = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const courses = await prisma.course.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!courses) {
    return res.status(404).json({ err: "course not found" });
  }
  const updateresponse = await prisma.course.update({
    where: { id: +req.params.id },
    data: req.body,
  });
  if (!updateresponse) {
    return res.status(404).json({ err: "failed to update course" });
  }

  return res.status(200).json(updateresponse);
};
