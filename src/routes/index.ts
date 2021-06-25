import { Router } from "express";
import postRoute from './post'
import topicRoute from './topic'
const router = Router();

router.use('/post', postRoute);
router.use('/topic', topicRoute);

export default router