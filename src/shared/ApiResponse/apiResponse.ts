import { Response } from "express";
import {ApiResponseParams} from './types';

export const ApiResponse = ( status:boolean, message:string, data:[] | {} | null, apiStatus = 200, response:Response) => {
    return response.status(apiStatus).json({status,message,data } as ApiResponseParams);
}
