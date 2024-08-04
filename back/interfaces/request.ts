import { Request } from "express";

export interface LoggerReq extends Request{
    time?: string
}

export interface UserReq extends Request{
    user?: any
}