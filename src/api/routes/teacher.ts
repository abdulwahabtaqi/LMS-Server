import express from "express";
import { getAllTeachers } from "./../controllers/teachers/teachers"
const router = express.Router();

router.get('/all', getAllTeachers);
export default router