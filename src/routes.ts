import {Router} from 'express'
import { LoginSistem } from './controllers/LoginController'
import { RecoveryPassword } from './controllers/RecoveryController'
import { UserController } from './controllers/Usercontroller'
import { authMiddleware, authMiddlewareParam, authMiddlewareEmailVerification } from "./middlewares/authMiddleware"
import {celebrate} from 'celebrate'
import { formUserValidator, loginValidator, RecoveryPassValidator } from './helpers/ValidatorFormUser'

const routes = Router()

routes.get("/users",authMiddleware, new UserController().getUsers)

routes.get("/", new UserController().index)
routes.post("/users",celebrate(formUserValidator), new UserController().cadastre)
routes.get("/completeregistration/:token",celebrate(formUserValidator),authMiddlewareEmailVerification, new UserController().completeRegistration)

routes.post("/login",celebrate(loginValidator), new LoginSistem().login)
routes.get("/profile",authMiddleware, new LoginSistem().getProfile)

routes.post("/forgotpassword", new RecoveryPassword().forgotPasswort)
routes.post("/recoverpassword/:token",celebrate(RecoveryPassValidator),authMiddlewareParam, new RecoveryPassword().recoveryPassword)

routes.delete("/users", authMiddleware, new UserController().deleteUser)





export default routes