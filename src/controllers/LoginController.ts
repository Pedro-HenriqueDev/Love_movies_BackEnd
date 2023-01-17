import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepositories";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class LoginSistem {
    async login(req: Request,res: Response) {
        const {email, password} = req.body

        const user = await UserRepository.findOneBy({email})

        if(!user) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        const verifyPass = await bcrypt.compare(password, user.password)

        if(!verifyPass) {
            return res.status(400).json({message: "Invalid email or password"})
        }
        
        const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '', {expiresIn: '7d'})

        const {password:_,...userLogin} = user
        return res.json({user: userLogin ,token})

    }

    async getProfile(req: Request,res: Response) {
        return res.json(req.user)
    }

    
}