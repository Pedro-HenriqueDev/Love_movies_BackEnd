import { MailService } from "@sendgrid/mail"

interface mail {
    from: string,
    to: string,
    subject: string,
    html: string
}
export async function sendEmail(mail: mail, message: string) {
    const sendGrid = new MailService()
    sendGrid.setApiKey(process.env.SD_APIKEY ?? "")

    const emailSent = await sendGrid.send(mail)
    
    console.log(emailSent)

    if(emailSent[0].statusCode == 202) {
        return {status: 200, message}
    }
    return {status: 500, message: "Internal Server Error"}
}

export const mailContent = (email: string, token: string) => {
    return {
        from: `Testes Testando <projetopessoal00@gmail.com>`,
        to: email,
        subject: "Password recovery!",
        html: `<p>Link to change password: <a href="https://love-movie.vercel.app/#/newpass/${token}">Click here</a> </p>`
    }
}

export const mailVerification = (email: string, token: string) => {
    return {
        from: `Testes Testando <projetopessoal00@gmail.com>`,
        to: email,
        subject: "Account verification",
        html: `<p>Click to complete registration! <a href="https://love-movie.vercel.app/#/accountcreated/${token}">Click here</a> </p>`
    }
}