import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";

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


export const getAllAssignments = async (req: Request, res: Response) => {
    try {
        const assignments = await prisma.assignment.findMany({
            include: {
                teacher: true,
                subject: true,
                grade: true,
            },
        });

        const formattedAssignments = assignments.map(assignment => ({
            id: assignment.id,
            title: assignment.title,
            description: assignment.description,
            teacher: assignment.teacher?.name, // Include teacher's name if needed
            subject: assignment.subject?.subject, // Get the subject name
            grade: assignment.grade?.grade,       // Get the grade name
            createdAt: assignment.createdAt,
            updatedAt: assignment.updatedAt,
        }));

        return ApiResponse(true, "All assignments retrieved successfully", formattedAssignments, 200, res);
    } catch (error) {
        console.log("getAllAssignments::error", JSON.stringify(error));
        return ApiResponse(false, "Error retrieving all assignments", error, 500, res);
    }
};
