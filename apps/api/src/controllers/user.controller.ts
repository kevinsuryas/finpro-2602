// Handle Request & Response
import { Request, Response, NextFunction } from 'express';
import prisma from '../connection';
import { hashPassword, hashMatch } from '../libs/hashPassword'
import { jwtCreate } from '../libs/jwt';
import { jwtVerify } from '../libs/jwt';
// import { transporterNodemailer } from '../utils/transportMailer';
import fs from 'fs';
import Handlebars from 'handlebars';
import { transporterMailer } from '@/libs/nodemailer';


export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {email} = req.body;

    if (!email) {
      throw { error: true, message: 'Email must be filled', data:null };
    }
    
    // Create the new user
    const createUser = await prisma.customer.create({
      data: {
        email,
        verified: 0,
        active: 1
      },
    });
    const token:any = await jwtCreate({ id: createUser.id, role: 'customer', email});

    console.log(token.length)

    await prisma.customer.update({
      where: {
        id: createUser.id
      },
      data: {
        accessToken: token
      }
    })

    console.log(token, new Date(token.exp))

    const template = fs.readFileSync("src/libs/VerifyEmailTemplate.html", "utf-8")
    
    
    let compiledTemplate: any = await Handlebars.compile(template);
    compiledTemplate = compiledTemplate({ email, verifyToken:token });
    
    await transporterMailer.sendMail({
        from: 'jjanistech@gmail.com',
        to: email,
        subject: 'Welcome!',
        html: compiledTemplate,
      });
      
      res.status(200).send({
        error: false,
        message: 'Register Success',
        data: null,
      });
    } catch (error:any) {
    console.log(error)
    }

  };

  export const verification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {accessToken, name, phoneNumber, password} = req.body
      if (!accessToken) {
        throw { error: true, message: 'Verification token is missing', data: null };
      }
      const decodedToken: any = await jwtVerify(accessToken)
      await prisma.customer.update({
        where: { id: decodedToken.id },
        data: { 
          verified: 1,
          name,
          phone_number: phoneNumber,
          password: await hashPassword(password) 
        } // Assuming 1 means verified, update according to your schema
      });
    } catch (error) {
      console.log(error)
    }
  }

  export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<void> => {
      try {
        const { email, password }= req.body;
        
      const users:any = await prisma.customer.findFirst({
        where: {
          email
        },
      });
      
      if (users === null) throw ({ error: false, message: "Email not Found", data: null })
  
      const isCompare = await hashMatch(password, users.password);
  
      if (isCompare === false) throw ({ error: false, message: "Password Doesn't Match", data: null })
  
  
      const token = await jwtCreate({ id: users.id, role: 'customer', email });
  
      res.status(200).send({
        error: false,
        message: 'Login Success',
        data: {
          username: users.email,
          token,
          
        },
      });
    } catch (error: any) {
      next({
          ...error,
          status: 400
        })
    }
  };
  