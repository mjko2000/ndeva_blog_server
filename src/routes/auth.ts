import { Request, Response, Router } from "express";
import fetch from 'node-fetch'
import { signInController, signUpController } from '../controllers/authController'
const router = Router();

router.post('/signUp', signUpController)

export default router