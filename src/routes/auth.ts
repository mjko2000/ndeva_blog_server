import { Request, Response, Router } from "express";
import fetch from 'node-fetch'
import { signInController, signUpController, getInfoFromToken } from '../controllers/authController'
const router = Router();

router.post('/signUp', signUpController)
router.post('/signIn', signInController)
router.post('/getInfoFromToken', getInfoFromToken)

export default router