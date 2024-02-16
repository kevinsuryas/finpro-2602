import { comparePassword, hashPassword } from '@/libs/bcrypt';
import { jwtCreate } from '@/libs/jwt';
import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body
    const superAdmin: any = await prisma.super_Admin.findFirst({
      select: {
        id: true,
        name: true,
        username: true,
        password: true
      },
      where: {
        username
      }
    })

    const isPasswordCorret = await comparePassword(password, superAdmin?.password)

    if (!isPasswordCorret) throw ({ error: false, message: "Username or Password not match", status: 401 })
    res.status(200).send({
      success: true,
      message: "Login Success",
      data: await jwtCreate({ id: superAdmin?.id, role: "super_admin", email: superAdmin?.username })
    })

  } catch (error) {
    next(error)
  }
}