import { Request, Response } from "express";
import UserModel from "../models/UserModel";

export const signInController = (req: Request, res: Response) => {
  const { email, username, password, rePassword } = req.body
  if(!email || !username || !password || !rePassword)
    return res.status(200).json({
      resultCode: 1,
      data: null,
      message: "Vui lòng điền đầy đủ thông tin"
    })
}

export const signUpController = (req: Request, res: Response) => {
  const { email, username, password, rePassword } = req.body
  if(!email || !username || !password || !rePassword)
    return res.status(200).json({
      resultCode: -1,
      data: null,
      message: "Vui lòng điền đầy đủ thông tin"
    })
  UserModel.signUp(req.body).then(user => {
    res.status(200).json({
      resultCode: 1,
      data: {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        accessToken: user.generateAuthToken()
      },
      message: "Thành công"
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      resultCode: -1,
      data: null,
      message: "Lỗi server"
    })
  })
}