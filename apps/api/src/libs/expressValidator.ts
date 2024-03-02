import { Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"

export const loginAdminValidator = [
    body('username', 'Username cant be Empty').notEmpty(),
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