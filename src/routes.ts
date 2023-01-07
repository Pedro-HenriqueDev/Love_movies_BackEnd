import {Router} from 'express'
import { LoginSistem } from './controllers/LoginController'
import { RecoveryPassword } from './controllers/RecoveryController'
import { UserController } from './controllers/Usercontroller'
import { authMiddleware, authMiddlewareParam, authMiddlewareEmailVerification } from "./middlewares/authMiddleware"

const routes = Router()

routes.post("/user", new UserController().cadastre)
routes.get("/completeregistration/:token",authMiddlewareEmailVerification, new UserController().completeRegistration)

routes.post("/login", new LoginSistem().login)
routes.get("/profile",authMiddleware, new LoginSistem().getProfile)

routes.post("/forgotpassword", new RecoveryPassword().forgotPasswort)
routes.post("/recoverpassword/:token",authMiddlewareParam, new RecoveryPassword().recoveryPassword)





export default routes