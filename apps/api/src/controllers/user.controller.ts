// Handle Request & Response
import { Request, Response, NextFunction } from 'express';
import prisma from '../connection';
import { hashPassword, hashMatch } from '../libs/hashPassword';
import { accessTokenJwt, jwtCreate, refreshTokenJwt } from '../libs/jwt';
import { jwtVerify } from '../libs/jwt';
// import { transporterNodemailer } from '../utils/transportMailer';
import fs from 'fs';
import Handlebars from 'handlebars';
import { registerUserService, setTokenToCustomer, updateVerified, updateLogin, findEmail, updateTokenPassword, verificationValidate } from '@/services/user.service';
import { registerAccountMailer, forgetPasswordMailer} from '@/libs/nodemailer';
import { transporterMailer } from '@/libs/nodemailer';

export const register = async (req: Request, res: Response,next: NextFunction,): Promise<void> => {
import { transporterMailer } from '@/libs/nodemailer';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email)
      throw { error: true, message: 'Email must be filled', data: null };

    // Create the new user
    const createUser = await prisma.customer.create({
      data: {
        email,
        verified: 0,
        active: 1,
      },
    });
    const token: any = await jwtCreate({
      id: createUser.id,
      role: 'customer',
      email,
    });

    console.log(token.length);

    await prisma.customer.update({
      where: {
        id: createUser.id,
      },
      data: {
        accessToken: token,
      },
    });

    console.log(token, new Date(token.exp));

    const template = fs.readFileSync(
      'src/libs/VerifyEmailTemplate.html',
      'utf-8',
    );

    let compiledTemplate: any = await Handlebars.compile(template);
    compiledTemplate = compiledTemplate({ email, verifyToken: token });

    await transporterMailer.sendMail({
      from: 'jjanistech@gmail.com',
      to: email,
      subject: 'Welcome!',
      html: compiledTemplate,
    });

    res.status(201).send({
      error: false,
      message: 'Register Success',
      data: null,
    });
  } catch (error: any) {
    next({
      ...error,
      status: 400,
    });
  }
};

export const verification = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => (
  try {
    const { accessToken, name, phoneNumber, password } = req.body;
    if (!accessToken) {
      throw {
        error: true,
        message: 'Verification token is missing',
        data: null,
      };
    }
    const decodedToken: any = await jwtVerify(accessToken)

    // Check if the user is already verified

    const user = await prisma.customer.findUnique({
      where: { id: decodedToken.id },
    });

    if (user && user.verified === 1) {
      throw {
        error: true,
        message: 'Account is already verified',
        data: null,
      };
    }

    // Verify the user
    await updateVerified (decodedToken.id, name, phoneNumber, password);


    res.status(201).send({
      error: false,
      message: 'Verification Success',
      data: null,
    });
  } catch (error: any) {
    next({
      ...error,
      status: 400,
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const users: any = await prisma.customer.findFirst({
      where: {
        email,
      },
    });
    if (!users) throw { error: false, message: 'Email not Found', data: null };

    const isCompare = await hashMatch(password, users.password);
    if (!isCompare)
      throw { error: false, message: "Password Doesn't Match", data: null };

    let accessToken = users.accessToken;

    if (Date.now() >= users.accessToken * 1000) {
      const accessToken = await accessTokenJwt({
        id: users.id,
        role: 'customer',
        email,
      });
    }

    await updateLogin (users.id, accessToken)

    const refreshToken = await refreshTokenJwt({
      id: users.id,
      role: 'customer',
      email,
    });

    res.status(200).send({
      error: false,
      message: 'Login Success',
      data: {
        email: users.email,
        accessToken,
        refreshToken,
      },
    });
    
  } catch (error: any) {
    next({
      ...error,
      status: 400,
    });
  }

}

export const forgetPassword = async (req: Request,res: Response,next: NextFunction,): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await findEmail(email);
=======
};

export const validateGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, name, picture } = req.body;
    console.log(req.body);

    if (!email || !name || !picture) {
      throw { error: true, message: 'Email must be filled', data: null };
    }
  }
  catch (error: any) {
    
  }
}
export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email } = req.body;

    const user: any = await prisma.customer.findFirst({
      where: {
        email,
      },
    });
    
    if (!user) throw { error: false, message: 'Email not Found', data: null };

    const token: any = await jwtCreate({
      id: user.id,
      role: 'customer',
      email,
    });


    await forgetPasswordMailer(email, token);
    const template = fs.readFileSync(
      'src/libs/ResetPasswordTemplate.html',
      'utf-8',
    );

    let compiledTemplate: any = await Handlebars.compile(template);
    compiledTemplate = compiledTemplate({ email, resetToken: token });

    await transporterMailer.sendMail({
      from: 'jjanistech@gmail.com',
      to: email,
      subject: 'Reset Your Password!',
      html: compiledTemplate,
    });


    res.status(200).send({
      error: false,
      message: 'Reset Password Success',
      data: null,
    });
  } catch (error: any) {
    next({
      ...error,
      status: 400,
    });
  }
};


export const resetPassword = async (req: Request,res: Response,next: NextFunction,): Promise<void> => {
// Import necessary modules and dependencies

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {

  try {
    const { password, token } = req.body;

    // Validate if password and passwordConfirmation are provided
    if (!password || !token) {
      throw {
        error: true,
        message: 'New password and password confirmation are required',
        data: null,
      };
    }

    const users: any = await prisma.customer.findFirst({
      where: {},
    });

    const isCompare = await hashMatch(password, users.password);
    if (isCompare)
      throw {
        error: false,
        message: 'Password can not be the same with the old password',
        data: null,
      };

    const decodedtoken: any = await jwtVerify(token);

    await updateTokenPassword (decodedtoken.id, password)


    await prisma.customer.update({
      where: {
        id: decodedtoken.id,
      },
      data: {
        password: await hashPassword(password),
      },
    });

    // update, login, register berhubungan input ke data base pake 201
    res.status(201).send({
      error: false,
      message: 'Password reset successful',
      data: null,
    });
  } catch (error: any) {
    // Handle errors
    next({ ...error, status: 400 });
  }
};

export const verificationValidateToken = async (req: Request,res: Response,next: NextFunction,): Promise<void> => {
  try {
    const { accessToken } = req.body;

    const decodedToken: any = await jwtVerify(accessToken);

    const user = await verificationValidate (decodedToken.id)

    if (user?.verified === 1) {
      throw {
        error: true,
        message: 'Your have been verified',
        data: null,
      };
    }
  } catch (error: any) {
    next({ ...error, status: 500 });
  }
}

export const validateGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, name, picture } = req.body;
    console.log(req.body);

    if (!email || !name || !picture) {
      throw { error: true, message: 'Email must be filled', data: null };
    }

 // Create the new user
 const createUser = await prisma.customer.create({
  data: {
    email,
    name,
    picture,
    verified: 0,
    active: 1,
    isGoogle: 1
  },
});

const token: any = await jwtCreate({
  id: createUser.id,
  role: 'customer',
  email,
});

await prisma.customer.update({
  where: {
    id: createUser.id,
  },
  data: {
    accessToken: token,
  },
});

console.log(token, new Date(token.exp));

const template = fs.readFileSync(
  'src/libs/VerifyEmailTemplate.html',
  'utf-8',
);

let compiledTemplate: any = await Handlebars.compile(template);
compiledTemplate = compiledTemplate({ email, verifyToken: token });

await transporterMailer.sendMail({
  from: 'jjanistech@gmail.com',
  to: email,
  subject: 'Welcome!',
  html: compiledTemplate,
});

res.status(201).send({
  error: false,
  message: 'Register Success',
  data: null,
});
} catch (error: any) {
next({
  ...error,
  status: 400,
});
}
};
=======

