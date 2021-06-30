import { Request, Response, Router } from "express";
import fetch from 'node-fetch'
import {detailPost, createPost} from '../controllers/postController'
import {isAuth} from '../middleware/authMiddleware'
const router = Router();

router.post('/createPost',isAuth, createPost)

router.get('/:id', detailPost)

export default router