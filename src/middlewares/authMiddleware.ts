import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepositories";
import jwt from "jsonwebtoken"
import { CelebrateError } from "celebrate";

type jwtPayload = {
    id?: string
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
            return res.status(401).json({message: "Not authorized"})
            
        }
        const token = authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_PASS ?? '', async function(err, decoded) {
            console.log("fqefq")
            if(err != null) {
                return res.status(401).json({message: "Not authorized"})
            }
            if(!decoded) {
                return res.status(401).json({message: "Not authorized"})
            }

            let {email} = decoded as jwtPayload

            if(!email) {
                return res.status(401).json({message: "Not authorized"})
            }
            const user = await UserRepository.findOneBy({email})
    
            if(!user) {
                return res.status(400).json({message: "User does not exist"})
            }
            const {password:_,...loggeedUser} = user
            
            req.user =loggeedUser
            next()
        })
        
}

export const authMiddlewareParam = async (req: Request,res: Response, next: NextFunction) => {
    const token = req.params.token
        if(!token) {
            return res.status(401).json({message: "Not authorized"})
        }

        const {email} = jwt.verify(token, process.env.JWT_PASS ?? '') as jwtPayload

        const user = await UserRepository.findOneBy({email})

        if(!user) {
            return res.status(401).json({message: "Not authorized"})
        }
        
        req.user = user
        next()
}

export const authMiddlewareEmailVerification = async (req: Request,res: Response, next: NextFunction) => {
    const token = req.params.token
        
        if(!token) {
            return res.status(401).json({message: "Not authorized"})
        }

        const {name, email, password} = jwt.verify(token, process.env.JWT_PASS ?? '') as jwtVerificationPayload
        
        const userExist = await UserRepository.findOneBy({email})

        if(userExist) {
            return res.status(401).json({message: "User exist!"})
        }

        req.user = {name, email, password}
        next()
}

export const celebrateErrorValidator = async(err: Error ,req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CelebrateError) {
        const errorBody = err.details.get('body')
        return res.status(400).json({
            message: errorBody?.message
        })
    }
    return;
}