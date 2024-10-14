import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";

export const sendConn = async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;


    try {
        const existingRequest = await prisma.connectionRequest.findFirst({
            where: { senderId, receiverId },
        });

        if (!_.isEmpty(existingRequest)) {
            if (existingRequest.status === "PENDING") {
                await prisma.connectionRequest.delete({
                    where: { id: existingRequest.id },
                });
                return ApiResponse(true, "Connection request withdrawn.", null, 200, res);
            }

            if (existingRequest.status === "ACCEPTED") {
                await prisma.connectionRequest.delete({
                    where: { id: existingRequest.id },
                });
                return ApiResponse(true, "Connection removed.", null, 200, res);
            }
        }

        const newRequest = await prisma.connectionRequest.create({
            data: { senderId, receiverId, status: "PENDING" },
        });

        if (_.isEmpty(newRequest)) {
            return ApiResponse(false, "Connection request not created.", null, 409, res);
        }

        console.log(newRequest)

        return ApiResponse(true, "Connection request sent.", newRequest, 201, res);
    } catch (error) {
        console.log("sendConn::error", JSON.stringify(error));
        return ApiResponse(false, "Something went wrong.", error, 500, res);
    }
};

export const getAcceptedConnections = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const connections = await prisma.connectionRequest.findMany({
            where: {
                OR: [
                    { senderId: userId, status: "ACCEPTED" },
                    { receiverId: userId, status: "ACCEPTED" },
                ],
            },
        });


        return ApiResponse(true, "Accepted connections retrieved.", connections, 200, res);
    } catch (error) {
        console.log("getAcceptedConnections::error", JSON.stringify(error));
        return ApiResponse(false, "Something went wrong.", error, 500, res);
    }
};

export const getPendingConnections = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const pendingRequests = await prisma.connectionRequest.findMany({
            where: {
                receiverId: userId,
                status: "PENDING",
            },
        });

        return ApiResponse(true, "Pending requests retrieved.", pendingRequests, 200, res);
    } catch (error) {
        console.log("getPendingConnections::error", JSON.stringify(error));
        return ApiResponse(false, "Something went wrong.", error, 500, res);
    }
};
export const getSendPending = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const pendingRequests = await prisma.connectionRequest.findMany({
            where: {
                senderId: userId,
                status: "PENDING",
            },
        });

        return ApiResponse(true, "Pending requests retrieved.", pendingRequests, 200, res);
    } catch (error) {
        console.log("getSendPending::error", JSON.stringify(error));
        return ApiResponse(false, "Something went wrong.", error, 500, res);
    }
};


export const acceptRequest = async (req: Request, res: Response) => {
    const { requestId } = req.body;

    try {
        const updatedRequest = await prisma.connectionRequest.update({
            where: { id: requestId },
            data: { status: "ACCEPTED" },
        });

        return ApiResponse(true, "Request accepted.", updatedRequest, 200, res);
    } catch (error) {
        console.log("acceptRequest::error", JSON.stringify(error));
        return ApiResponse(false, "Something went wrong.", error, 500, res);
    }
};

export const rejectRequest = async (req: Request, res: Response) => {
    const { requestId } = req.body;

    try {
        await prisma.connectionRequest.delete({
            where: { id: requestId },
        });

        return ApiResponse(true, "Request rejected.", null, 200, res);
    } catch (error) {
        console.log("rejectRequest::error", JSON.stringify(error));
        return ApiResponse(false, "Something went wrong.", error, 500, res);
    }
};


export const deleteConnection = async (req: Request, res: Response) => {
    const { connectionId } = req.params;

    try {
        const deletedConnection = await prisma.connectionRequest.delete({
            where: { id: connectionId },
        });

        return ApiResponse(true, "Connection removed.", deletedConnection, 200, res);
    } catch (error) {
        console.log("deleteConnection::error", JSON.stringify(error));
        return ApiResponse(false, "Something went wrong.", error, 500, res);
    }
};