import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import errorHandler from "errorhandler";
import { body, validationResult } from "express-validator";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import router from "./router";
const app = express();
const prisma = new PrismaClient();

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);
// app.get("/api/course");

// app.post(
//   "/api/createcourse",
//   body("title").isString().notEmpty(),
//   body("desc").isString().notEmpty(),
//   body("duration").isFloat().notEmpty(),
//   body("instructorId").isInt().optional(),
//   async (req, res) => {
//     //validate request
//     const errors = validationResult(req);
//     console.log(errors);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//       const course = await prisma.course.create({
//         data: {
//           title: req.body.title,
//           desc: req.body.desc,
//           duration: req.body.duration,
//           instructorId: req.body.instructorId,
//         },
//       });
//       return res.status(201).json(course);
//     } catch (error) {
//       // Handle Prisma errors

//       if (error instanceof PrismaClientValidationError) {
//         console.log("error", error);
//         return res.status(400).json({
//           error: "Prisma Validation Error",
//           message: error.message,
//         });
//       }
//     }
//   }
// );

app.post("/api/addinstructor", async (req, res) => {
  const instructor = await prisma.instructor.create({
    data: {
      email: "test@gmail.com",
      name: "testUser",
    },
  });
  res.status(201);
  return res.json(instructor);
});
// error handling middleware
// app.use((error: { message: any }, req: any, res: any, next: any) => {
//   console.log(`${error.message}`);
//   next(error);
// });
app.use(errorHandler());
export default app;
