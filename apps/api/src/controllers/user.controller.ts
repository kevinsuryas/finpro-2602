// Handle Request & Response
import { Request, Response, NextFunction } from 'express';
import prisma from '../connection';
import { hashPassword, hashMatch } from '../libs/HashPassword'
import { jwtCreate } from '../libs/jwt';
// import { transporterNodemailer } from '../utils/transportMailer';
import fs from 'fs';
import Handlebars from 'handlebars';


export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {email, password,} = req.body;

    if (!email || !password ) {
      throw { message: 'Data Not Complete!' };
    }

    // // Hash the password
    const hashedPassword: string = await hashPassword(password);

    // Create the new user
    const createUser = await prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = await jwtCreate({ id: createUser.id, role: 'customer', email });

    const template = fs.readFileSync('src/TemplateUser.html', 'utf-8');

    // let compiledTemplate: any = await Handlebars.compile(template);
    // compiledTemplate = compiledTemplate({ username, token });

    // await transporterNodemailer.sendMail({
    //   from: 'masdefry20@gmail.com',
    //   to: email,
    //   subject: 'Welcome!',
    //   html: compiledTemplate,
    // });

    res.status(200).send({
      error: false,
      message: 'Register Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

