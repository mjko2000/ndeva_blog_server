import { Router } from "express";
import authRoute from './auth'
import postRoute from './post'
import topicRoute from './topic'
const router = Router();

router.use('/auth', authRoute);
router.use('/post', postRoute);
router.use('/topic', topicRoute);

export default router