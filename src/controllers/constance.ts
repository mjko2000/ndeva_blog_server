import { Response } from "express";
interface ResponseData {}
export const withResponse = (res: Response,resultCode: 1 | -1,data: any,message: string) => {
  return res.status(200).json({resultCode,data,message})
}

export const withErrorResponse = (res: Response) => {
  return res.status(500).json({resultCode: -1,data: null,message: "Lỗi server"})
}