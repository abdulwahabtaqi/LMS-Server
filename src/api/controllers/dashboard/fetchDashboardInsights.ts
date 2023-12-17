import { ApiResponse } from "@/shared";
import { prisma } from "@/shared/prisma";
import { Insights } from "./types";
import { Request, Response } from "express";

export const FetchDashboardInsightsHandler = async (req: Request, res: Response) => {
    try {
        const totalSchools = await prisma.school.count();
        const totalGrades = await prisma.grade.count();
        const totalSubjects = await prisma.subject.count();
        const totalTopics = await prisma.topic.count();
        const totalSubTopics = await prisma.subTopic.count();
        const totalQuestions = await prisma.question.count();
        const insights = {
            totalSchools,
            totalGrades,
            totalSubjects,
            totalTopics,
            totalSubTopics,
            totalQuestions
        } as Insights;
        return ApiResponse(true, "Dashboard Insights", insights, 200, res);
    }
    catch (error) {
        console.log("FetchDashboardInsightsHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}