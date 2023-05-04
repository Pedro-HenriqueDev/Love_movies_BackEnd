import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepositories";
import { mailContent, sendEmail } from "../sendGrid/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface result {
    status: number,
    message: string
}
export class RecoveryPassword {
    async forgotPasswort(req: Request,res: Response) {
        const {email} = req.body

        if(!email) {
            return res.status(400).json({message: "Email required"})
        }

        const user = await UserRepository.findOneBy({email})

        if(!user) {
            return res.status(400).json({message: "Email not found"})
        }

        const token = jwt.sign({email: user.email}, process.env.JWT_PASS ?? '', {expiresIn: '1h'})

        const emailResult = await sendEmail(mailContent(email, token), "Recovery link sent to your email")
        console.log(emailResult)
        res.status(emailResult.status).json(emailResult.message)
    }

    async recoveryPassword(req: Request,res: Response) {
        const user = await UserRepository.findOneBy({id: req.user.id})
        const newPass = req.body.password
        
        if(!user) {
            return res.status(400).json({message: "Email not found"})
        }
        
        const hash = await bcrypt.hash(newPass, 10)
        user.password = hash

        await UserRepository.save(user)
        
        return res.json("Ok, your password has been changed")
    }
}