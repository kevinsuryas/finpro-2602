import prisma from "@/prisma";
import { hashPassword } from "@/libs/bcrypt";

// REGISTER CONTROLLER 
// Create the new user
    export const registerUserService = async (email: string) => {
        const createUser = await prisma.customer.create({
            data: {
              email,
              verified: 0,
              active: 1,
            },
          }); 
          return createUser
    }

    export const setTokenToCustomer = async (id:string, token:string) => {
        const setToken = await prisma.customer.update({
            where: {
              id: id,
            },
            data: {
              accessToken: token,
            },
          });
          return setToken
    }

    // VERIFICATION CONTROLLER

        // Check if the user is already verified
    export const verificationValidateToken = async (id:string) => {
          const user = await prisma.customer.findUnique({
            where: { id: id },
          });
          return user
        }
          
   
  export const updateVerified = async (id:string, name:any, phoneNumber:any, password:any) => {
    const updateVerified = await prisma.customer.update({
      where: { id: id },
      data: {
        verified: 1,
        name,
        phone_number: phoneNumber,
        password: await hashPassword(password),
      },
    });
    return updateVerified
  }

    // Verification Validate
    export const verificationValidate = async (id:string) => {
      const verificationValidate = await prisma.customer.findFirst({
        where: { id: id },
        select: {
          verified: true
        }
      })
      return verificationValidate
    }

  // LOGIN CONTROLLER
  export const updateLogin = async (id:string, accessToken:any) => {
    const updateLogin = await prisma.customer.update({
      where: { id: id },
      data: {
       accessToken: accessToken
      },
    });
    return updateLogin
  }

  // FORGET PASSWORD
  export const findEmail = async (email:string) => {
    const user: any = await prisma.customer.findFirst({
      where: {
        email,
      },
    });
    return user
  }

  // RESET PASSWORD
  export const updateTokenPassword = async (id:string, password:any) => {
    const updateTokenPassword = await prisma.customer.update({
      where: { id: id },
      data: {
        password: await hashPassword(password),
      }
    })
    return updateTokenPassword
  }

