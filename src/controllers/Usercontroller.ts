import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { UserRepository } from "../repositories/UserRepositories";
import { configMail, mailVerification } from "../nodemailer/config"
import bcrypt from "bcrypt"
import * as nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

export class UserController {

    async index(req: Request,res: Response) {
        return res.json("Sistema de cadastro e login, Pedro Henrique")
    }

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

    async getUsers(req: Request,res: Response) {
        const users = await UserRepository.find({select: {id: true, email: true, name: true}})
        
        return res.json(users)
    }

    async deleteUser(req: Request,res: Response) {
        const userId = req.user.id
        const password = req.body.password

        const user = await UserRepository.findOneBy({id: userId})

        if(!user){
            throw new BadRequestError("Usuario nao existe")
        }

        const verifyPass = await bcrypt.compare(password, user.password)

        if(!verifyPass) {
            throw new BadRequestError("Senha invalida")
        }

        await UserRepository.remove(user)

        const {password:_, ...userDeleted} = user

        return res.json({user: userDeleted, message: "Usuario deletado com sucesso"})
        
    }

}