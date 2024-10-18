import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import { v2 as cloudinary } from "cloudinary";

export const createAssignment = async (req: Request, res: Response) => {
    try {
        const { titles, teacherId, subjectId, gradeId, totalMarks, lastSubmissionDate } = req.body;

        // Validate that all required fields are provided
        if (!titles || !teacherId || !subjectId || !gradeId || totalMarks === undefined || !lastSubmissionDate) {
            return ApiResponse(false, "Missing required fields", null, 400, res);
        }

        // Validate that titles is an array and contains objects with the necessary fields
        if (!Array.isArray(titles) || titles.length === 0) {
            return ApiResponse(false, "Titles must be a non-empty array", null, 400, res);
        }

        // Ensure each title has a name
        const titleData = titles.map((title) => {
            if (!title.name) {
                throw new Error("Each title must have a name");
            }
            return {
                name: title.name,
                description: title.description || null, // Optional description
            };
        });

        // Create the new assignment along with its titles
        const assignment = await prisma.assignment.create({
            data: {
                teacher: { connect: { id: teacherId } },
                subject: { connect: { id: subjectId } },
                grade: { connect: { id: gradeId } },
                totalMarks: Number(totalMarks),  // Set total marks
                lastSubmissionDate: new Date(lastSubmissionDate),  // Parse and set the deadline date
                titles: {
                    create: titleData,  // Create titles associated with the assignment
                },
            },
            include: {
                titles: true, // Include the titles in the response
            },
        });

        return ApiResponse(true, "Assignment created successfully", assignment, 201, res);
    } catch (error) {
        console.log(error)
        console.log("createAssignment::error", JSON.stringify(error));
        return ApiResponse(false, "Error creating assignment", error.message || error, 500, res);
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
                titles: true, // Include the titles in the query
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Map the assignments to include grade, subject names, titles, total marks, and last submission date
        const formattedAssignments = assignments.map(assignment => ({
            id: assignment.id,
            titles: assignment.titles.map(title => ({
                name: title.name,
                description: title.description, // Description can be null
            })), // Map through the titles array
            grade: assignment.grade ? assignment.grade.grade : null, // Get the name of the grade
            subject: assignment.subject ? assignment.subject.subject : null, // Get the name of the subject
            createdAt: assignment.createdAt,
            updatedAt: assignment.updatedAt,
            totalMarks: assignment.totalMarks, // Include totalMarks
            lastSubmissionDate: assignment.lastSubmissionDate, // Include lastSubmissionDate
        }));

        return ApiResponse(true, "Assigned assignments retrieved successfully", formattedAssignments, 200, res);
    } catch (error) {
        console.log("getAssignedAssignments::error", JSON.stringify(error));
        return ApiResponse(false, "Error retrieving assignments", error.message || error, 500, res);
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
                },
                titles: true, // Include the titles
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Map and format assignments to include submission status, titles, totalMarks, and lastSubmissionDate
        const formattedAssignments = assignments.map(assignment => {
            const submission = assignment.submissions.length > 0 ? assignment.submissions[0] : null; // Get the latest submission (if any)

            return {
                id: assignment.id,
                titles: assignment.titles.map(title => ({
                    name: title.name,
                    description: title.description, // Description can be null
                })), // Map through the titles array
                teacher: assignment.teacher?.name,
                subject: assignment.subject?.subject,
                grade: assignment.grade?.grade,
                totalMarks: assignment.totalMarks, // Add totalMarks
                lastSubmissionDate: assignment.lastSubmissionDate, // Add lastSubmissionDate
                createdAt: assignment.createdAt,
                updatedAt: assignment.updatedAt,
                status: submission ? 'Submitted' : 'Pending', // Check if there's a submission
                submittedAt: submission ? submission.createdAt : null // If submitted, get the submission date
            };
        });

        return ApiResponse(true, "Connected teacher assignments retrieved successfully", formattedAssignments, 200, res);
    } catch (error) {
        console.log("getConnectedAssignments::error", JSON.stringify(error));
        return ApiResponse(false, "Error retrieving connected assignments", error.message || error, 500, res);
    }
};



export const submitAssignment = async (req: Request, res: Response) => {
    try {
        const { assignmentId, userId, file } = req.body;


        if (!assignmentId || !userId || !file) {
            return ApiResponse(false, "Missing required fields or file", null, 400, res);
        }


        const result = await cloudinary.uploader.upload(file, {
            folder: "assignments",
            resource_type: "auto",

        })
        console.log(result)


        // Check if the assignment and student exist
        const assignment = await prisma.assignment.findUnique({
            where: { id: assignmentId }
        });
        const student = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!assignment || !student) {
            return ApiResponse(false, "Assignment or student not found", null, 404, res);
        }

        // Create a new submission entry
        const submission = await prisma.submission.create({
            data: {
                assignment: { connect: { id: assignmentId } },
                student: { connect: { id: userId } },
                fileUrl: result.secure_url,
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
                        student: true,
                    },
                },
                subject: true,
                grade: true,
                titles: true, // Include titles in the query
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
            fileUrl: submission.fileUrl,
            submittedAt: submission.createdAt,
            marks: submission.marks,
        }));

        // Sort submissions to have the most recent at the top
        formattedSubmissions.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

        const responseData = {
            id: assignment.id,
            titles: assignment.titles.map(title => ({
                name: title.name,
                description: title.description, // Can be null
            })), // Format titles as an array
            subject: assignment.subject?.subject,
            grade: assignment.grade?.grade,
            createdAt: assignment.createdAt,
            updatedAt: assignment.updatedAt,
            totalMarks: assignment.totalMarks, // Add totalMarks here
            lastSubmissionDate: assignment.lastSubmissionDate, // Add lastSubmissionDate here
            submissions: formattedSubmissions,
        };

        return ApiResponse(true, "Assignment retrieved successfully", responseData, 200, res);
    } catch (error) {
        console.log("getSingleAssignment::error", JSON.stringify(error));
        return ApiResponse(false, "Error retrieving assignment", error.message || error, 500, res);
    }
};


export const gradeAssignment = async (req: Request, res: Response) => {
    try {
        const { assignmentId, studentId, marks } = req.body;

        if (!assignmentId || !studentId || marks === undefined) {
            return ApiResponse(false, "Missing required fields", null, 400, res);
        }

        // Find the assignment submission for the given student
        const submission = await prisma.submission.findFirst({
            where: {
                assignmentId,
                studentId,
            },
        });

        if (!submission) {
            return ApiResponse(false, "Submission not found", null, 404, res);
        }

        // Update the submission with the assigned marks
        const updatedSubmission = await prisma.submission.update({
            where: { id: submission.id },
            data: {
                marks,
                status: marks >= 0 ? 'SUBMITTED' : 'PENDING', // Mark as 'SUBMITTED' once graded
            },
        });


        return ApiResponse(true, "Marks assigned successfully", updatedSubmission, 200, res);
    } catch (error) {
        console.log("gradeAssignment::error", JSON.stringify(error));
        return ApiResponse(false, "Error assigning marks", error, 500, res);
    }
};
