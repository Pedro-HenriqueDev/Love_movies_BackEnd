import {Router} from 'express'
import { LoginSistem } from './controllers/LoginController'
import { RecoveryPassword } from './controllers/RecoveryController'
import { UserController } from './controllers/Usercontroller'
import { authMiddleware, authMiddlewareParam, authMiddlewareEmailVerification } from "./middlewares/authMiddleware"

const routes = Router()

routes.get("/users", new UserController().getUsers)

routes.get("/", new UserController().index)
routes.post("/users", new UserController().cadastre)
routes.get("/completeregistration/:token",authMiddlewareEmailVerification, new UserController().completeRegistration)

routes.post("/login", new LoginSistem().login)
routes.get("/profile",authMiddleware, new LoginSistem().getProfile)

routes.post("/forgotpassword", new RecoveryPassword().forgotPasswort)
routes.post("/recoverpassword/:token",authMiddlewareParam, new RecoveryPassword().recoveryPassword)

routes.delete("/users", authMiddleware, new UserController().deleteUser)





export default routes