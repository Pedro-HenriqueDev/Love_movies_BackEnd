"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailVerification = exports.mailContent = exports.sendEmail = void 0;
const mail_1 = require("@sendgrid/mail");
async function sendEmail(mail, message) {
    var _a;
    const sendGrid = new mail_1.MailService();
    sendGrid.setApiKey((_a = process.env.SD_APIKEY) !== null && _a !== void 0 ? _a : "");
    const emailSent = await sendGrid.send(mail);
    if (emailSent[0].statusCode == 202) {
        return { status: 200, message };
    }
    return { status: 500, message: "Internal Server Error" };
}
exports.sendEmail = sendEmail;
const mailContent = (email, token) => {
    return {
        from: `Testes Testando <projetopessoal00@gmail.com>`,
        to: email,
        subject: "Password recovery!",
        html: `<p>Link to change password: <a href="https://love-movie.vercel.app/#/newpass/${token}">Click here</a> </p>`
    };
};
exports.mailContent = mailContent;
const mailVerification = (email, token) => {
    return {
        from: `Testes Testando <projetopessoal00@gmail.com>`,
        to: email,
        subject: "Account verification",
        html: `<p>Click to complete registration! <a href="https://love-movie.vercel.app/#/accountcreated/${token}">Click here</a> </p>`
    };
};
exports.mailVerification = mailVerification;
