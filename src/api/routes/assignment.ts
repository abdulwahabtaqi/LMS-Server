import express from "express";
import { createAssignment, getAssignedAssignments, getConnectedAssignments, getSingleAssignment, gradeAssignment, submitAssignment } from "./../controllers/assignment/assignment";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'src/uploads/assignments';

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/create", createAssignment);
router.get("/myAssignments/:teacherId", getAssignedAssignments);
router.get("/allAssignments/:userId", getConnectedAssignments);
router.post("/submit", submitAssignment);
// router.post("/submit", upload.single('file'), submitAssignment);
router.get('/:assignmentId/user/:userId', getSingleAssignment);
router.post("/grade", gradeAssignment);

export default router;
