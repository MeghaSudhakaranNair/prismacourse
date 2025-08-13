import { Router } from "express";
import {
  addCourses,
  deleteCourse,
  fetchCourse,
  getCourses,
  updateCourse,
} from "./handlers/course";
import { body, param } from "express-validator";
import { addInstructor } from "./handlers/instructor";
import { addVideo, getVideo } from "./handlers/video";
import { loginUser, privateRoute, registerUser } from "./handlers/user";
import { authenticate } from "./middleware/auth";
import { addApplication } from "./handlers/application";
const router = Router();
router.get("/courses/:instructorId", param("instructorId").isInt(), getCourses);
router.post(
  "/createcourse",
  authenticate,
  body("title").isString().notEmpty(),
  body("desc").isString().notEmpty(),
  body("duration").isFloat().notEmpty(),
  body("instructorId").isInt().optional(),
  addCourses
);
router.get("/course/:id", authenticate, param("id").isInt(), fetchCourse);
router.delete("/deletecourse/:id", param("id").isInt(), deleteCourse);
router.put(
  "/updatecourse/:id",
  param("id").isInt(),
  body("title").isString().optional(),
  body("desc").isString().optional(),
  body("duration").isFloat().optional(),
  body("instructorId").isInt().optional(),
  updateCourse
);
// router.get("/course/:id", param("id").isInt(), fetchCourse);
router.post(
  "/addinstructor",
  body("email").isString().notEmpty(),
  body("name").isString().notEmpty(),

  addInstructor
);
router.post(
  "/addvideo",
  body("title").isString().notEmpty(),
  body("desc").isString().notEmpty(),
  body("url").isString().notEmpty(),
  body("id").isString().notEmpty(),
  body("key").isString().optional(),
  body("metadata").isString().optional(),
  body("descurl").isString().notEmpty(),
  addVideo
);
router.get("/getVideo", getVideo);
router.post(
  "/signup",
  body("email").isString().notEmpty(),
  body("firstName").isString().notEmpty(),
  body("lastName").isString().notEmpty(),
  body("password").isString().notEmpty(),
  registerUser
);
router.get(
  "/signin",
  body("email").isString().notEmpty(),
  body("password").isString().notEmpty(),
  loginUser
);

router.get("/private", authenticate, privateRoute);
router.post("/addapplication", addApplication);
export default router;
