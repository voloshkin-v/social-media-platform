import express from 'express';
import * as userController from './user.controllers';
import { verifyToken } from '../../middleware/verifyToken';
import { verifyStatus } from '../../middleware/verifyStatus';

const router = express.Router();

// router.use(verifyToken, verifyStatus);

router.route('/').get(userController.getUsers);
router.route('/:id').get(userController.getUser);
router.patch('/updateMe', userController.updateMe);

export default router;
