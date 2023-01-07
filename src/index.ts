import 'express-async-errors'
import express from 'express'
import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/error'
import routes from './routes'

const port = process.env.PORT || 3000

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())

	app.use(routes)

	app.use(errorMiddleware)
	return app.listen(port)
})