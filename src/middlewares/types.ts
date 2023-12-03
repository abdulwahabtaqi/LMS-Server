import { JWTEncryptedData } from "@/api/controllers/authentication/types";
import { Request } from "express";

export interface AuthenticatedRequest extends Request
{
    user?: JWTEncryptedData; 
}
