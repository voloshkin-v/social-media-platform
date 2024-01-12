import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import AppError from '../utils/appError';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/img');
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1];
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
	},
});

const multerFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback
) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new AppError('Not an image! Please upload only images', 400));
	}
};
const upload = multer({ storage, fileFilter: multerFilter });

export default upload;
