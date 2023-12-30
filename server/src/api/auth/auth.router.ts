import express from 'express';
import * as authController from './auth.controllers';

const router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);
router.route('/refresh').get(authController.refresh);

export default router;
