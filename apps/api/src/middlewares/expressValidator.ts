import { Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"

export const loginAdminValidator = [
    body('username', 'Username cant be Empty').notEmpty(),
    body('password', 'Password cant be Empty').notEmpty()
]

export const loginUserValidator = [
    body('email', 'Email cant be Empty').notEmpty(),
    body('password', 'Password cant be Empty').notEmpty()
]

export const registerUserValidator = [
    body('email', 'Email cant be Empty').notEmpty(),
]

export const verificationUserValidator = [
    body('name', 'Name cant be Empty').notEmpty(),
    body('accessToken', 'accessToken cant be Empty').notEmpty(),
    body('phoneNumber', 'phoneNumber cant be Empty').notEmpty(),
    body('password', 'Password cant be Empty').notEmpty(),
]

export const forgetPasswordUserValidator = [
    body('email', 'Email cant be Empty').notEmpty(),
]

export const resetPasswordValidator = [
    body('password', 'Password cant be Empty').notEmpty()
]

export const handleValidator = (req: Request, res: Response, next: NextFunction) => {
    const error: any = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(401).send(
            { message: error.errors[0].msg }
        )
    }

    next()
}