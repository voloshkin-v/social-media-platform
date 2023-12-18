import express from 'express';

const router = express.Router();

router
	.route('/')
	.get((req, res) => {
		res.send('posts GET');
	})
	.post((req, res) => {
		console.log(req.body);
		res.send('posts POST');
	});

router
	.route('/:id')
	.get((req, res) => {
		res.send('get SINGLE');
	})
	.patch((req, res) => {
		res.send('posts PATCH');
	})
	.delete((req, res) => {
		res.send('posts DELETE');
	});

export default router;
