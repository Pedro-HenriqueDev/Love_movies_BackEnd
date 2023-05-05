import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepositories";
import { mailVerification, sendEmail } from "../sendGrid/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class UserController {

    async index(req: Request,res: Response) {
        return res.json("Welcome, Registration and login system, Pedro Henrique")
    }

    async cadastre(req: Request,res: Response) {
        const {name, email, password} = req.body

        const userExist = await UserRepository.findOneBy({email})

        if(userExist) {
            return res.status(400).json({message:"Email already exists"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = {name, email, password: hashPassword}

        const token = jwt.sign(user, process.env.JWT_PASS ?? '', {expiresIn: '1h'})
        
        const emailResult = await sendEmail(mailVerification(email, token), "A verification email has been sent to your email")

        return res.status(emailResult.status).json(emailResult.message)
    }

    async completeRegistration(req: Request,res: Response) {
        const user = req.user
        
        await UserRepository.save(user)
        
        return res.status(201).json("Account created!")
    }

    async getUsers(req: Request,res: Response) {
        const users = await UserRepository.find({select: {id: true, email: true, name: true}})
        
        return res.json(users)
    }

    async deleteUser(req: Request,res: Response) {
        const id = req.user.id
        const password = req.body.password

        const user = await UserRepository.findOneBy({id})
        
        if(!user){
            return res.status(400).json({message:"Email or password invalid"})
        }

        const verifyPass = await bcrypt.compare(password, user.password)
        console.log(verifyPass, user)
        if(!verifyPass) {
            return res.status(400).json({message:"Email or password invalid"})
        }

        const userDeleted = await UserRepository.remove(user)
        
        return res.json({userDeleted, message: "User deleted successfully"})
        
    }

}