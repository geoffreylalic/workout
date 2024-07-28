import { Request } from "express";

export interface LoggerReq extends Request{
    time?: string
}