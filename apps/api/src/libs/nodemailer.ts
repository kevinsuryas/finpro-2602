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

// export const verifyAccount = async (email: string) => {

//     const verifyToken = await jwtCreate({ id: "testid", role: "customer", email })
//     const template = fs.readFileSync("./VerifyEmailTemplate.html", "utf-8")
//     let compiledTemplate: any = await Handlebars.compile(template)
//     compiledTemplate = compiledTemplate({ email: "testid@gmail.com", verifyToken })

//     await transporterMailer.sendMail({
//         from: "Jinbe Wash",
//         to: email,
//         subject: "Welcome",
//         html: compiledTemplate
//     })
// }