import { Request, Response, Router } from "express";
import { createTopic, deleteFileByAdmin, removeTopic } from '../controllers/adminController'
const router = Router();

router.post('/createTopic', createTopic)
router.post('/removeTopic', removeTopic)
router.post('/deleteFile', deleteFileByAdmin)

export default router