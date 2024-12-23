import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";

export const createAssignment = async (req: Request, res: Response) => {
    try {
        const { questionIds, userId, name, assignData } = req.body;
        const { schoolId, gradeId, subjectId, topicId, subTopicId } = assignData;

        console.log(req.body);

        // Create the assignment with relations to user, questions, and assignData
        const assignment = await prisma.assignmentQuestion.create({
            data: {
                name,
                user: { connect: { id: userId } },
                questions: {
                    connect: questionIds.map((questionId: string) => ({
                        id: questionId,
                    })),
                },
                school: { connect: { id: schoolId } },
                grade: { connect: { id: gradeId } },
                subject: { connect: { id: subjectId } },
                topic: { connect: { id: topicId } },
                subTopic: { connect: { id: subTopicId } },
            },
        });


        return ApiResponse(true, "Assignment created successfully", assignment, 200, res);
    } catch (error) {
        return ApiResponse(false, "Error creating assignment", error.message || error, 500, res);
    }
};


export const getConnAssign = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id);

        const connectedTeachers = await prisma.connectionRequest.findMany({
            where: {
                OR: [
                    { senderId: id, status: 'ACCEPTED' },
                    { receiverId: id, status: 'ACCEPTED' }
                ]
            },
        });
        console.log(connectedTeachers);

        const teacherIds = connectedTeachers.map(conn =>
            conn.senderId === id ? conn.receiverId : conn.senderId
        );

        const assignments = await prisma.assignmentQuestion.findMany({
            where: {
                userId: {
                    in: teacherIds,
                },
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true,
                questions: {
                    include: {
                        answers: true,
                    },
                },
                school: true,
                grade: true,
                subject: true,
                topic: true,
                subTopic: true,
            },
        });

        // Filter out duplicate answers for each question
        assignments.forEach(assignment => {
            assignment.questions.forEach(question => {
                const uniqueAnswers = Array.from(
                    new Map(question.answers.map(answer => [answer.answer, answer])).values()
                );
                question.answers = uniqueAnswers;
            });
        });

        return ApiResponse(true, "Assignments fetched successfully", assignments, 200, res);
    } catch (error) {
        return ApiResponse(false, "Error fetching assignments", error.message || error, 500, res);
    }
};


export const getTeacherAssignments = async (req: Request, res: Response) => {
    try {
        const { teacherId } = req.params;

        const assignments = await prisma.assignmentQuestion.findMany({
            where: {
                userId: teacherId,
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true,
                questions: {
                    include: {
                        answers: true,
                    },
                },
                school: true,
                grade: true,
                subject: true,
                topic: true,
                subTopic: true,
            },
        });

        assignments.forEach(assignment => {
            assignment.questions.forEach(question => {
                const uniqueAnswers = Array.from(
                    new Map(question.answers.map(answer => [answer.answer, answer])).values()
                );
                question.answers = uniqueAnswers;
            });
        });

        return ApiResponse(true, "Teacher's assignments fetched successfully", assignments, 200, res);
    } catch (error) {
        return ApiResponse(false, "Error fetching teacher's assignments", error.message || error, 500, res);
    }
};


export const deleteAssignment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { teacherId } = req.params;

        const assignment = await prisma.assignmentQuestion.findUnique({
            where: { id: id },
            select: { userId: true }
        });

        if (!assignment) {
            return ApiResponse(false, "Assignment not found", null, 404, res);
        }

        if (assignment.userId !== teacherId) {
            return ApiResponse(false, "You are not authorized to delete this assignment", null, 403, res);
        }

        const deletedAssignment = await prisma.assignmentQuestion.delete({
            where: { id: id },
        });

        return ApiResponse(true, "Assignment deleted successfully", deletedAssignment, 200, res);
    } catch (error) {
        return ApiResponse(false, "Error deleting assignment", error.message || error, 500, res);
    }
};