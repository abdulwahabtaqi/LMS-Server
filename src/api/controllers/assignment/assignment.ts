import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import path from "path";
import { orderBy } from "lodash";

export const createAssignment = async (req: Request, res: Response) => {
    try {
        const { title, description, teacherId, subjectId, gradeId } = req.body;
        if (!title || !description || !teacherId || !subjectId || !gradeId) {
            return ApiResponse(false, "Missing required fields", null, 400, res);
        }


        const assignment = await prisma.assignment.create({
            data: {
                title,
                description,
                teacher: { connect: { id: teacherId } },
                subject: { connect: { id: subjectId } },
                grade: { connect: { id: gradeId } },
            },
        });


        return ApiResponse(true, "Assignment created successfully", assignment, 201, res);
    } catch (error) {
        console.log("createAssignment::error", JSON.stringify(error));
        return ApiResponse(false, "Error creating assignment", error, 500, res);
    }
};


export const getAssignedAssignments = async (req: Request, res: Response) => {
    try {
        const { teacherId } = req.params;
        const assignments = await prisma.assignment.findMany({
            where: { teacherId },
            include: {
                subject: true,
                grade: true,
            }, orderBy: {
                createdAt: 'desc',
            },
        });

        // Map the assignments to include grade and subject names
        const formattedAssignments = assignments.map(assignment => ({
            id: assignment.id,
            title: assignment.title,
            description: assignment.description,
            grade: assignment.grade ? assignment.grade.grade : null, // Get the name of the grade
            subject: assignment.subject ? assignment.subject.subject : null, // Get the name of the subject
            createdAt: assignment.createdAt,
            updatedAt: assignment.updatedAt,
        }));

        return ApiResponse(true, "Assigned assignments retrieved successfully", formattedAssignments, 200, res);
    } catch (error) {
        console.log("getAssignedAssignments::error", JSON.stringify(error));
        return ApiResponse(false, "Error retrieving assignments", error, 500, res);
    }
};


export const getConnectedAssignments = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        // Get connected teachers
        const connectedTeachers = await prisma.connectionRequest.findMany({
            where: {
                OR: [
                    { senderId: userId, status: 'ACCEPTED' },
                    { receiverId: userId, status: 'ACCEPTED' }
                ]
            },
        });

        const teacherIds = connectedTeachers.map(connection =>
            connection.senderId === userId ? connection.receiverId : connection.senderId
        );

        // Get all assignments for connected teachers
        const assignments = await prisma.assignment.findMany({
            where: {
                teacherId: { in: teacherIds }
            },
            include: {
                teacher: true,
                subject: true,
                grade: true,
                submissions: {
                    where: {
                        studentId: userId // Fetch only submissions from the current user
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Map and format assignments to include submission status
        const formattedAssignments = assignments.map(assignment => {
            const submission = assignment.submissions.length > 0 ? assignment.submissions[0] : null; // Get the latest submission (if any)

            return {
                id: assignment.id,
                title: assignment.title,
                description: assignment.description,
                teacher: assignment.teacher?.name,
                subject: assignment.subject?.subject,
                grade: assignment.grade?.grade,
                createdAt: assignment.createdAt,
                updatedAt: assignment.updatedAt,
                status: submission ? 'Submitted' : 'Pending', // Check if there's a submission
                submittedAt: submission ? submission.createdAt : null // If submitted, get the submission date
            };
        });

        return ApiResponse(true, "Connected teacher assignments retrieved successfully", formattedAssignments, 200, res);
    } catch (error) {
        console.log("getConnectedAssignments::error", JSON.stringify(error));
        return ApiResponse(false, "Error retrieving connected assignments", error, 500, res);
    }
};



export const submitAssignment = async (req: Request, res: Response) => {
    try {
        const { assignmentId, studentId } = req.body;


        if (!assignmentId || !studentId || !req.file) {
            return ApiResponse(false, "Missing required fields or file", null, 400, res);
        }

        // Get the uploaded file URL
        const fileUrl = path.join('src/uploads/assignments', req.file.filename);

        // Check if the assignment and student exist
        const assignment = await prisma.assignment.findUnique({
            where: { id: assignmentId }
        });
        const student = await prisma.user.findUnique({
            where: { id: studentId }
        });

        if (!assignment || !student) {
            return ApiResponse(false, "Assignment or student not found", null, 404, res);
        }

        // Create a new submission entry
        const submission = await prisma.submission.create({
            data: {
                assignment: { connect: { id: assignmentId } },
                student: { connect: { id: studentId } },
                fileUrl: fileUrl,
            }
        });

        return ApiResponse(true, "Assignment submitted successfully", submission, 201, res);
    } catch (error) {
        console.log("submitAssignment::error", JSON.stringify(error));
        return ApiResponse(false, "Error submitting assignment", error, 500, res);
    }
};


export const getSingleAssignment = async (req: Request, res: Response) => {
    try {
        const { assignmentId, userId } = req.params; // Assuming userId is passed as a parameter for authorization

        const assignment = await prisma.assignment.findUnique({
            where: { id: assignmentId },
            include: {
                submissions: {
                    include: {
                        student: true, // Include student details
                    },
                },
                subject: true,
                grade: true,
            },
        });

        if (!assignment) {
            return ApiResponse(false, "Assignment not found", null, 404, res);
        }

        // Check if the user is authorized to view this assignment (e.g., a teacher)
        if (assignment.teacherId !== userId) {
            return ApiResponse(false, "You do not have permission to view this assignment", null, 403, res);
        }

        // Format the submissions to include file URLs and student names
        const formattedSubmissions = assignment.submissions.map(submission => ({
            studentId: submission.studentId,
            studentName: submission.student.name, // Get the student's name
            fileUrl: submission.fileUrl, // File URL for download
            submittedAt: submission.createdAt,
        }));

        // Sort submissions to have the most recent at the top
        formattedSubmissions.sort((a, b) => {
            return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
        });

        const responseData = {
            id: assignment.id,
            title: assignment.title,
            description: assignment.description,
            subject: assignment.subject?.subject,
            grade: assignment.grade?.grade,
            createdAt: assignment.createdAt,
            updatedAt: assignment.updatedAt,
            submissions: formattedSubmissions,
        };

        return ApiResponse(true, "Assignment retrieved successfully", responseData, 200, res);
    } catch (error) {
        console.log("getSingleAssignment::error", JSON.stringify(error));
        return ApiResponse(false, "Error retrieving assignment", error, 500, res);
    }
};
