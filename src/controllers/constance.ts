import { Response } from "express";
interface ResponseData {}
export const withSuccess = (res: Response, data: any,message: string) => {
  return res.status(200).json({resultCode: 1,data,message})
}

export const withError = (res: Response,message: string) => {
  return res.status(200).json({resultCode: -1,data: null,message})
}

export const withInternalError = (res: Response) => {
  return res.status(500).json({resultCode: -1,data: null,message: "Lỗi server"})
}