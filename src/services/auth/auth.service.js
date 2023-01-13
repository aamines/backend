import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import lodash from 'lodash';
import generateRandomAlphaNumericCode from '../../utils/random.js';
// import { hashPassword, comparePassword } from './password.service.js';

// create user
export const createUser  = async (data) => {
    const prisma =  new PrismaClient();
    const user = await findUserByEmail(data.email);
    if(user){
        return "Email already used"
    }
    const hashedPassowrd = await hashPassword(data.password);
    const code  = generateRandomAlphaNumericCode().toUpperCase();

    const newUser = await prisma.user.create({
        data:{
            names: data.names,
            email: data.email,
            password: hashedPassowrd,
            country: data.country,
            emailVerificationCode: code,
            emailVerificationCodeExpiresAt: (Date.now()) + (20 * 60 * 1000)
        }
    })

    if (newUser) {
        sendEMail({
            to: data.email,
            subject: 'Projectia - Email Verification',
            from: `${process.env.EMAIL_USER}`,
            text: `
                  <h2>Confirm your email address</h2>
                  <h2>Your confirmation code is below — enter it in your open browser window and we'll help you get signed in.</h2>
                  <h3>This code will expire in 20 minutes</h3>
                  <br>
                  <h2>${code}</h2>
                  <br>
                  <h3>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</h3>
                  <h3>Thanks for using Projectia</h3>
                  `
        });
        return `check ${user.email} for verification code`;
    }
    return "unable to create user";
}

// verify email
export const verifyEmail = async (email, code) => {
    const prisma = new PrismaClient()
    const user = await findUserByEmail(email)
    if (user != null) {
        if (user.emailVerificationCode === code && user.emailVerificationCodeExpiresAt != null) {
            if (user.emailVerificationCodeExpiresAt > Date.now()) {
                await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        emailVerified: true,
                        emailVerificationCode: null,
                        emailVerificationCodeExpiresAt: null
                    }
                })
                return "email verified";
            }
            return "code expired";
        }
        return "invalid code";
    }
    return "user not found";
}

//login user
export const login = async (email, password) => {
    const user = await findUserByEmail(email);
    if (user != null) {
        if (user.emailVerified) {
            //compare password
            const passMatch = await comparePassword(password, user.password)
            if (passMatch) {
                const token = await generateToken(user);
                return token;
            }
            return "invalid email or password";
        }
        return "email not verified";
    }
    return "Invalid email or password";
}
//forgot password
export const forgotPassword = async (email) => {
    const prisma = new PrismaClient()
    const user = await findUserByEmail(email)
    if (user != null) {
        const code = generateRandomAlphaNumericCode().toUpperCase();
        await prisma.user.update({
            where: {
                email
            },
            data: {
                resetPasswordCode: code,
                resetPasswordCodeExpiresAt: (Date.now()) + (10 * 60 * 1000)
            }
        })
        sendEMail({
            to: email,
            subject: 'Projectia - Password Reset',
            from: `${process.env.EMAIL_USER}`,
            text: `
            <h1>Reset your password</h1>
            <h2>Your confirmation code is below — enter it in your open browser window and we'll help you get signed in.</h2>
            <h2>This code will expire in 10 minutes</h2>
            <br>
            <h1>${code}</h1>
            <br>
            <h3>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</h3>
            <h3>Thanks for using Projectia</h3>
            `
        });
        return `check your email ${email} for password reset code`;
    }
    return "user not found";
}
//reset password
export const resetPassword = async (email, code, password) => {
    const prisma = new PrismaClient()
    const user = await findUserByEmail(email)
    if (user != null) {
        if (user.resetPasswordCode === code && user.resetPasswordCodeExpiresAt != null) {
            if (user.resetPasswordCodeExpiresAt > Date.now()) {
                const hashedPassword = await hashPassword(password)
                await prisma.user.update({
                    where: {
                        email
                    },
                    data: {
                        password: hashedPassword,
                        resetPasswordCode: null,
                        resetPasswordCodeExpiresAt: null
                    }
                })
                return "password reset successful";
            }
            return "code expired";
        }
        return "invalid code";
    }
    return "user not found";
}
//change password
export const changePassword = async (email, oldPassword, newPassword) => {
    const prisma = new PrismaClient()
    const user = await findUserByEmail(email)
    if (user != null) {
        //compare password
        const passMatch = await comparePassword(oldPassword, user.password)
        if (passMatch) {
            const hashedPassword = await hashPassword(newPassword)
            await prisma.user.update({
                where: {
                    email
                },
                data: {
                    password: hashedPassword
                }
            })
            return "password changed";
        }
        return "invalid password";
    }
    return "user not found";
}
//get current logged in user info
export const getUserById = async (id) => {
    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return lodash.pick(user, ['id', 'names', 'email', 'country', 'createdAt', 'updatedAt']);
}

// find user by email
export const findUserByEmail = async (email) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique(email);
    if(user){
        return user;
    }else{
        return null;
    } 
}

//generate access token
async function generateToken(user) {
    const payload = {
        id: user.id
    }
    const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });
    return token;
}