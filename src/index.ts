import 'express-async-errors'
import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
import cors from 'cors'
import { celebrateErrorValidator } from './middlewares/authMiddleware'

const port = process.env.PORT || 3000

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(cors());

	app.use(express.json())

	app.use(routes)
	app.use(celebrateErrorValidator)
	return app.listen(port)
})