import nodemailer from "nodemailer"
import fs from "fs"
import { jwtCreate } from "./jwt"
import Handlebars from "handlebars"

export const transporterMailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jjanistech@gmail.com",
        pass: "ymtvilrjztwmcfjb"
    },
    tls: {
        rejectUnauthorized: false
    }
})

export const verifyAccount = async (email: string) => {

    const verifyToken = await jwtCreate({ id: "testid", role: "customer" })
    const template = fs.readFileSync("./VerifyEmailTemplate.html", "utf-8")
    let compiledTemplate: any = await Handlebars.compile(template)
    compiledTemplate = compiledTemplate({ email: "testid@gmail.com", verifyToken })
}

<<<<<<< Updated upstream
    await transporterMailer.sendMail({
        from: "Jinbe Wash",
        to: email,
        subject: "Welcome",
        html: compiledTemplate
    })
=======
//     await transporterMailer.sendMail({
//         from: "Jinbe Wash",
//         to: email,
//         subject: "Welcome",
//         html: compiledTemplate
//     })
// }

export const registerAccountMailer = async (email: string, token:any) => {
    const template = fs.readFileSync('src/libs/VerifyEmailTemplate.html','utf-8',);

    let compiledTemplate: any = await Handlebars.compile(template);
    compiledTemplate = compiledTemplate({ email, verifyToken: token });

    await transporterMailer.sendMail({
      from: 'jjanistech@gmail.com',
      to: email,
      subject: 'Welcome!',
      html: compiledTemplate,
    });
   
}

export const forgetPasswordMailer = async (email: string, token:any) => {
    const template = fs.readFileSync('src/libs/ResetPasswordTemplate.html','utf-8', );
    let compiledTemplate: any = await Handlebars.compile(template);
    compiledTemplate = compiledTemplate({ email, resetToken: token });

    await transporterMailer.sendMail({
      from: 'jjanistech@gmail.com',
      to: email,
      subject: 'Reset Your Password!',
      html: compiledTemplate,
    });

}