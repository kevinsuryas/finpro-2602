import *as Yup from 'yup'

 // Updated Yup schema for form validation
 export const loginSchema = Yup.object().shape({
    email: Yup.string()
            .email('Invalid Email Address')
            .required('Email is Required'),
    password: Yup.string()
            .min(6, 'Password Must be 6 Characters')
            .max(12, 'Password Maximum 12 Characters')
            .required('Password is Required')
  });

  export const registerSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email Address')
        .required('Email is Required')
})

export const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
    .required('Password is required')
    .min(6, 'Password Must be 6 Characters')
    .max(12, 'Password Maximum 12 Characters'),
    passwordConfirmation: Yup.string()
        .required('Confirmation Password is required')
       .oneOf([Yup.ref('password')], 'Passwords must match')
})

export const forgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email Address')
        .required('Email is Required')
})

export const verificationSchema = Yup.object().shape({
    
    phoneNumber: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
    name: Yup.string()
        .min(6, 'name Must be 6 Characters')
        .required('name is Required'), 
    password: Yup.string()
        .min(6, 'Password Must be 6 Characters')
        .max(12, 'Password Maximum 12 Characters')
        .required('Password is Required')
})