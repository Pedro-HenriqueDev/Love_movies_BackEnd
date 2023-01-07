import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { UserRepository } from "../repositories/UserRepositories";
import { configMail, mailContent } from "../nodemailer/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as nodemailer from "nodemailer"

export class RecoveryPassword {
    async forgotPasswort(req: Request,res: Response) {
        const {email} = req.body

        const user = await UserRepository.findOneBy({email})

        if(!user) {
            throw new BadRequestError("Email nao encontrado")
        }

        const token = jwt.sign({email: user.email}, process.env.JWT_PASS ?? '', {expiresIn: '1h'})

        let transport = nodemailer.createTransport(configMail)

        await transport.sendMail(mailContent(email, token)).then((result) => {
            console.log(result)
            return res.json("Link de recuperaçao enviado para o seu Email")
        }).catch((err) => {
            console.log(err)
            return res.status(500).json("Ocorreu um erro interno")
        })

    }

    async recoveryPassword(req: Request,res: Response) {
        const user = await UserRepository.findOneBy({id: req.user.id})
        const newPass = req.body.password
        const hash = await bcrypt.hash(newPass, 10)

        if(!user) {
            throw new BadRequestError("Email nao encontrado")
        }
        user.password = hash

        await UserRepository.save(user)
        
        return res.json("Ok, sua senha foi alterada")
    }
}