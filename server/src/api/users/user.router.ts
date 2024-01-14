import express from 'express';

import * as userController from './user.controllers';
import { verifyToken } from '../../middleware/verifyToken';

const router = express.Router();
router.use(verifyToken);

router.route('/').get(userController.getUsers);

router
	.route('/profilePicture')
	.patch(userController.uploadUserPhoto, userController.updateProfilePicture)
	.delete(userController.deleteProfilePicture);

router
	.route('/currentUser')
	.get(userController.getCurrentUser)
	.patch(userController.updateCurrentUser);
router.route('/:id').get(userController.getUser);

export default router;
