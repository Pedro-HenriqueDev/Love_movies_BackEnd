import { Request, Response, response } from "express";
import { UserRepository } from "../repositories/UserRepositories";
import { mailVerification, sendEmail } from "../sendGrid/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fs, { unlink } from "fs";

export class UserController {

    async index(req: Request, res: Response) {
        return res.json("Welcome, Registration and login system, Pedro Henrique")
    }

    async cadastre(req: Request, res: Response) {
        const { name, email, password } = req.body
        const userExist = await UserRepository.findOneBy({ email })

        if (userExist) {
            return res.status(400).json({ message: "Email already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = { name, email, password: hashPassword }

        const token = jwt.sign(user, process.env.JWT_PASS ?? '', { expiresIn: '1h' })
        const emailResult = await sendEmail(mailVerification(email, token), "A verification email has been sent to your email")

        return res.status(emailResult.status).json(emailResult.message)
    }

    async completeRegistration(req: Request, res: Response) {
        const user = req.user

        await UserRepository.save(user)

        return res.status(201).json("Account created!")
    }

    async getUsers(req: Request, res: Response) {
        const users = await UserRepository.find({ select: { id: true, email: true, name: true } })

        return res.json(users)
    }

    async editImage(req: Request, res: Response) {
        if(req.body.remove == "true") {
            const user = await UserRepository.findOneBy({id: req.user.id})
            
            if(req.file){
                const nameImage = req.file?.path
                fs.unlink(nameImage, () =>{})
            }

            if(!user) {
                return res.status(400).json({ message: "User not found" })
            }
            user.image = ""

            const userUpdated = await UserRepository.save(user)

            const {password:_,...response} = userUpdated

            return res.json(response)
        }

        if(req.file) {
            const nameImage = req.file?.path

            const bitmap = fs.readFileSync(nameImage, 'base64');
            fs.unlink(nameImage, () =>{})
            console.log(bitmap.length)
            const user = await UserRepository.findOneBy({id: req.user.id})
            
            if(!user) {
                return res.status(400).json({ message: "User not found" })
            }
            user.image = bitmap

            const userUpdated = await UserRepository.save(user)

            const {password:_,...response} = userUpdated

            return res.json(response)
        }
        
        return res.status(400).json({message: "format not accepted"})
    }

    async deleteUser(req: Request, res: Response) {
        const id = req.user.id
        const password = req.body.password

        const user = await UserRepository.findOneBy({ id })

        if (!user) {
            return res.status(400).json({ message: "Email or password invalid" })
        }

        const verifyPass = await bcrypt.compare(password, user.password)
        if (!verifyPass) {
            return res.status(400).json({ message: "Email or password invalid" })
        }

        const userDeleted = await UserRepository.remove(user)

        return res.json({ userDeleted, message: "User deleted successfully" })

    }

}