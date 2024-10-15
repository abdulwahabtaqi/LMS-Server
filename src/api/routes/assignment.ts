import express from "express"
import { createAssignment, getAssignedAssignments, getAllAssignments } from "./../controllers/assignment/assignment";


const router = express.Router();

router.post("/create", createAssignment);
router.get("/myAssignments/:teacherId", getAssignedAssignments);
router.get("/allAssignments", getAllAssignments);



export default router;