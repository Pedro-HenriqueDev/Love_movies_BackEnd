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
        subject: "Password recovery!",
        html: `<p>Link to change password: <a href="https://love-movie.vercel.app/#/newpass/${token}">Click here</a> </p>`
    }
}

export const mailVerification = (email: string, token: string) => {
    return {
        from: `Testes Testando <${process.env.NODEM_USER}>`,
        to: email,
        subject: "Account verification",
        html: `<p>Click to complete registration! <a href="https://love-movie.vercel.app/#/accountcreated/${token}">Click here</a> </p>`
    }
}