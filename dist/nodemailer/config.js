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
        subject: "Recuperaçao de senha!",
        html: `<p>Link para mudar a senha: <a href="https://sistema-de-cadastro-e-login.vercel.app/recoverpassword/${token}">Clique Aqui</a> </p>`
    };
};
exports.mailContent = mailContent;
const mailVerification = (email, token) => {
    return {
        from: `Testes Testando <${process.env.NODEM_USER}>`,
        to: email,
        subject: "Verificaçao de Conta",
        html: `<p>Clique para finalizar Cadastro! <a href="https://sistema-de-cadastro-e-login.vercel.app/completeregistration/${token}">Clique Aqui</a> </p>`
    };
};
exports.mailVerification = mailVerification;
