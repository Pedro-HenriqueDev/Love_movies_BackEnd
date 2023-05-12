import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
import cors from 'cors'
import { celebrateErrorValidator } from './middlewares/authMiddleware'

const allowedOrigins = ['https://love-movie.vercel.app'];

const port = process.env.PORT || 3000

AppDataSource.initialize().then(() => {
	const app = express()

	const options: cors.CorsOptions = {
		origin: allowedOrigins,
		methods: ["GET", "OPTIONS", "PUT", "POST", "DELETE"],
	};

	app.use(cors(options));
	app.use(express.json())

	app.use(routes)
	app.use(celebrateErrorValidator)
	return app.listen(port)
})