export const configMail = {
    host: process.env.NODEM_HOST,
        port: Number(process.env.NODEM_PORT),
        secure: Boolean(process.env.NODEM_SECURE),
        auth: {
            user: process.env.NODEM_USER,
            pass: process.env.NODEM_PASS        
        },
        tls: {
            ciphers: process.env.NODEM_TLS
        }
}

export const mailContent = (email: string, token: string) => {
    return {
        from: `Testes Testando <${process.env.NODEM_USER}>`,
        to: email,
        subject: "Recuperaçao de senha!",
        html: `<p>Link para mudar a senha: <a href="http://localhost:3000/recoverpassword/${token}">Clique Aqui</a> </p>`
    }
}

export const mailVerification = (email: string, token: string) => {
    return {
        from: `Testes Testando <${process.env.NODEM_USER}>`,
        to: email,
        subject: "Verificaçao de Conta",
        html: `<p>Clique para finalizar Cadastro! <a href="http://localhost:3000/completeregistration/${token}">Clique Aqui</a> </p>`
    }
}