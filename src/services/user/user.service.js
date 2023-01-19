import { PrismaClient } from "@prisma/client";

export const updateUserService = async(userId, data) => {
    const prisma = new PrismaClient();
    const existingUser = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })
    if(!existingUser){
        return "user does not exist";
    }
    if (existingUser.email != data.email) {
        //update user and send email verification for new email

        //generating code
        const code = generateRandomAlphaNumericCode();
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                names: data.names || existingUser.names,
                email: data.email,
                country: data.country || existingUser.country,
                emailVerificationCode: code,
                emailVerified: false,
                emailVerificationCodeExpiresAt: (Date.now()) + (10 * 60 * 1000)
            }
        })
        if (updatedUser) {
            sendEMail({
                to: data.email,
                subject: 'Projectia - Email Verification',
                from: `${process.env.EMAIL_USER}`,
                text: `
              <h1>Confirm your email address</h1>
              <h2>Your confirmation code is below — enter it in your open browser window and we'll help you get signed in.</h2>
              <h2>This code will expire in 10 minutes</h2>
              <br>
              <h1>${code}</h1>
              <br>
              <h3>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</h3>
              <h3>Thanks for using Projectia</h3>
              `
            });
            return `check ${data.email} for verification code`;
        }
    }else {
        //update user if email is not changed
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                names: data.names || existingUser.names,
                country: data.country || existingUser.country
            }
        })
        if (updatedUser) {
            //return user without password using lodash
            console.log(updatedUser);
            return updatedUser;
        }
    }

}