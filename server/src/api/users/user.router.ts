import express from 'express';
import * as userController from './user.controllers';
import { verifyToken } from '../../middleware/verifyToken';
import { verifyStatus } from '../../middleware/verifyStatus';

const router = express.Router();

// router.use(verifyToken, verifyStatus);
router.use(verifyToken);

router.route('/').get(userController.getUsers);

export default router;
