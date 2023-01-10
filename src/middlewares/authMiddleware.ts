import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { UserRepository } from "../repositories/UserRepositories";
import jwt from "jsonwebtoken"

type jwtPayload = {
    id?: number
    email?: string
}

type jwtVerificationPayload = {
    email: string,
    name: string,
    password: string
}

export const authMiddleware = async (req: Request,res: Response, next: NextFunction) => {
    const {authorization} = req.headers
        
        if(!authorization) {
            throw new UnauthorizedError("Not authorized")
        }
        const token = authorization.split(" ")[2]

        const {id} = jwt.verify(token, process.env.JWT_PASS ?? '') as jwtPayload
        
        const user = await UserRepository.findOneBy({id})

        if(!user) {
            throw new UnauthorizedError("Not authorized")
        }
        const {password:_,...loggeedUser} = user
        
        req.user =loggeedUser
        next()
}

export const authMiddlewareParam = async (req: Request,res: Response, next: NextFunction) => {
    const token = req.params.token
        
        if(!token) {
            throw new UnauthorizedError("Not authorized")
        }

        const {email} = jwt.verify(token, process.env.JWT_PASS ?? '') as jwtPayload

        const user = await UserRepository.findOneBy({email})

        if(!user) {
            throw new UnauthorizedError("Not authorized")
        }
        
        req.user = user
        next()
}

export const authMiddlewareEmailVerification = async (req: Request,res: Response, next: NextFunction) => {
    const token = req.params.token
        
        if(!token) {
            throw new UnauthorizedError("Not authorized")
        }

        const {name, email, password} = jwt.verify(token, process.env.JWT_PASS ?? '') as jwtVerificationPayload
        
        const userExist = await UserRepository.findOneBy({email})

        if(userExist) {
            throw new BadRequestError("Email is already registered")
        }

        req.user = {name, email, password}
        next()
}