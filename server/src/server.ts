import app from './app';
import mongoose from 'mongoose';

const port = process.env.PORT ?? 3000;

const main = async () => {
	await mongoose.connect(process.env.DATABASE_URI!);
	console.log('Database is successfully connected');

	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
};

main().catch((err) => console.log(err));
