import { hashPassword } from '@/libs/bcrypt';
import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      console.log(req.body)

    } else {
      res.status(422).send({
        error: true,
        message: errors
      })
    }

  } catch (error) {
    console.log(error)
  }
}