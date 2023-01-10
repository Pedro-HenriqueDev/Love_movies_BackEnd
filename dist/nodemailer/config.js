"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailVerification = exports.mailContent = exports.configMail = void 0;
exports.configMail = {
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
};
const mailContent = (email, token) => {
    return {
        from: `Testes Testando <${process.env.NODEM_USER}>`,
        to: email,
        subject: "Password recovery!",
        html: `<p>Link to change password: <a href="https://sistema-de-cadastro-e-login.vercel.app/recoverpassword/${token}">Click here</a> </p>`
    };
};
exports.mailContent = mailContent;
const mailVerification = (email, token) => {
    return {
        from: `Testes Testando <${process.env.NODEM_USER}>`,
        to: email,
        subject: "Account verification",
        html: `<p>Click to complete registration! <a href="https://sistema-de-cadastro-e-login.vercel.app/completeregistration/${token}">Click here</a> </p>`
    };
};
exports.mailVerification = mailVerification;
