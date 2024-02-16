import { body } from "express-validator"

export const loginAdminValidator = [
    body('username', 'Username cant be Empty').notEmpty(),
    body('password', 'Password cant be Empty').notEmpty()
]