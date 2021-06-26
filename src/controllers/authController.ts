import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { withErrorResponse, withResponse } from "./constance";

export const signInController = (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) return withResponse(res, -1, null, "Vui lòng điền đầy đủ thông tin")
  UserModel.findOne({ username }).select("+password").then(user => {
    if (user && user.comparePassword(password)) return withResponse(res, 1, {
      userInfo: {
        username: user.username,
        email: user.email,
        avatar: user.avatar
      },
      accessToken: user.generateAuthToken()
    }, "OK")
    withResponse(res, -1, null, "Sai tên tài khoản hoặc mật khẩu")
  }).catch(err => {
    console.log(err);
    withErrorResponse(res)
  })
}

export const signUpController = async (req: Request, res: Response) => {
  const { email, username, password, rePassword } = req.body
  if (!email || !username || !password || !rePassword)
    return res.status(200).json({
      resultCode: -1,
      data: null,
      message: "Vui lòng điền đầy đủ thông tin"
    })
  if (username.length < 8) return withResponse(res, -1, null, "Username is too short")
  if (password.length < 8) return withResponse(res, -1, null, "Password is too week")
  if (password !== rePassword) return withResponse(res, -1, null, "Retype password is not match")
  const currentUser = await UserModel.findOne({ username })
  if (currentUser) return withResponse(res, -1, null, "Username is nnavailble")
  UserModel.signUp(req.body).then(user => {
    withResponse(res, 1, {
      userInfo: {
        username: user.username,
        email: user.email,
        avatar: user.avatar
      },
      accessToken: user.generateAuthToken()
    }, "OK")
  }).catch(err => {
    console.log(err);
    withErrorResponse(res)
  })
}

export const getInfoFromToken = async (req: Request, res: Response) => {
  const { token } = req.body
  UserModel.getFromToken(token).then(user => {
    if(user) return withResponse(res,1,{
      ...user.toObject()
    },"OK")
    withErrorResponse(res)
  }).catch(err => {
    withErrorResponse(res)
  })
}