import express from 'express';
import * as messageController from './message.controller';
import { verifyToken } from '../../middleware/verifyToken';

const router = express.Router();
router.use(verifyToken);

router.route('/').get(messageController.getMessages);
router.route('/send').post(messageController.sendMessage);

export default router;
