import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
import cors from 'cors'
import { celebrateErrorValidator } from './middlewares/authMiddleware'

const port = process.env.PORT || 3000

AppDataSource.initialize().then(() => {
	const app = express()

	app.use((req: Request, res: Response, next: NextFunction) => {
		res.setHeader("Access-Control-Allow-Credentials" , "true")
		res.setHeader("Access-Control-Allow-Origin" , "https://love-movie.vercel.app")
		res.setHeader("Access-Control-Allow-Methods" , "GET,OPTIONS,PATCH,DELETE,POST,PUT")
		res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization")
		next()
	})
	app.use(cors());
	app.use(express.json())

	app.use(routes)
	app.use(celebrateErrorValidator)
	return app.listen(port)
})