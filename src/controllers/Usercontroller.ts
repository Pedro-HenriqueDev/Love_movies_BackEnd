import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { UserRepository } from "../repositories/UserRepositories";
import { configMail, mailVerification } from "../nodemailer/config"
import bcrypt from "bcrypt"
import * as nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

export class UserController {

    async cadastre(req: Request,res: Response) {
        const {name, email, password} = req.body

        const userExist = await UserRepository.findOneBy({email})

        if(userExist) {
            throw new BadRequestError("Email ja existe")
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = {name, email, password: hashPassword}

        const token = jwt.sign(user, process.env.JWT_PASS ?? '', {expiresIn: '1h'})

        let transport = nodemailer.createTransport(configMail)

        await transport.sendMail(mailVerification(email, token)).then((result) => {
            console.log(result)
            return res.json("Um email de verificaçao foi enviado para o seu email")
        }).catch((err) => {
            console.log(err)
            return res.status(500).json("Ocorreu um erro interno")
        })

    }

    async completeRegistration(req: Request,res: Response) {
        const user = req.user
        
        await UserRepository.save(user)
        
        return res.json("Conta criada!")
    }

}