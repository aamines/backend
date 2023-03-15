const pug = require("pug");
const crypto = require('crypto');
const { convert } = require("html-to-text");
const { PrismaClient } = require("@prisma/client");
const path = require('path');

//configs
const sendEmail = require("../utils/email.util");
const {
  generateRandomAlphaNumericCode,
  generateToken,
} = require("../utils/auth.util");

//services
const { findUserByEmail } = require("./user.service");
const { hashPassword, comparePassword } = require("./password.service");

//prisma client
const prisma = new PrismaClient();

// create user
module.exports.createUser = async (data) => {
  try {
    //check user
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (user) {
      throw new Error("User already exists");
    }

    //create user
    const hashedPassword = await hashPassword(data.password);

    const code = crypto.randomBytes(20).toString('hex');
    const verificationLink = `https://projectia-dev.netlify.app//verify-email?email=${encodeURIComponent(data.email)}&token=${encodeURIComponent(code)}`;
    const newUser = await prisma.user.create({
      data: {
        names: data.names,
        email: data.email,
        password: hashedPassword,
        country: data.country,
        emailVerificationCode: code,
        emailVerificationCodeExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        statusId: 1,
      },
    });
    // send email using pug views
    // const templatePath = path.join(__dirname, '..', 'views', 'emails', 'verification.pug');
    // const html = pug.renderFile(
    //   `${templatePath}`,
    //   {
    //     link: verificationLink,
    //   }
    // );
    if (newUser) {
      sendEmail({
        to: data.email,
        subject: "Projectia - Email Verification",
        from: `${process.env.EMAIL_USER}`,
        text: `
        <p> Confirm your email address </p>
        <p> Your email confirmation link is below — click on it and we'll help you get signed in. </p>
        <p> <a href=${verificationLink}> Verification Link </a>
        <p> This code will expire in 24 hours </p>
        <p>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it. </p>
        <p> Thanks for using Projectia </p>
        `,
      });

      return new Promise((resolve, reject) => {
        resolve(`check ${newUser.email} for verification link`);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

// verify email
module.exports.verifyEmail = async (email, code) => {
  const user = await findUserByEmail(email);
  if (!user) return "user not found";

  if (user.emailVerificationCode !== code) return "Invalid code!";
  if (user.emailVerificationCodeExpiresAt < Date.now()) return "Verification token expired!";
  
  const updatedUser = await prisma.user.update({
    where: {
      email
    },
    data: {
      emailVerified: true,
      emailVerificationCode: null,
      emailVerificationCodeExpiresAt: null,
    }
  });

  if (!updatedUser) return "Could not update the user";

  const token = await generateToken(updatedUser);
  return token;
  // try {
  //   if (user != null) {
  //     if (
  //       user.emailVerificationCode === code &&
  //       user.emailVerificationCodeExpiresAt != null
  //     ) {
  //       if (user.emailVerificationCodeExpiresAt > Date.now()) {
  //         await prisma.user
  //           .update({
  //             where: {
  //               email: email,
  //             },
  //             data: {
  //               emailVerified: true,
  //               // emailVerificationCode: null,
  //               // emailVerificationCodeExpiresAt: null,
  //             },
  //           })
  //           .then(async () => {
  //             const token = await generateToken(user);
  //             return token;
  //           })
  //           .catch((error) => {
  //             throw new Error(error.message);
  //           });
  //       } else {
  //         throw new Error("code expired");
  //       }
  //     } else {
  //       throw new Error("invalid code");
  //     }
  //   } else {
  //     throw new Error("user not found");
  //   }
  // } catch (error) {
  //   return new Promise((resolve, reject) => {
  //     reject(error);
  //   });
  // }
};

//login user
module.exports.login = async (email, password) => {
  try {
    //check user
    const user = await findUserByEmail(email);

    if (!user || user == null) {
      throw new Error("invalid email or password");
    }

    if (!user.emailVerified) {
      throw new Error("email not verified");
    }

    //compare password
    const passMatch = await comparePassword(password, user.password);
    if (!passMatch) {
      throw new Error("invalid email or password");
    }

    //generate token
    const token = await generateToken(user);
    return new Promise((resolve, reject) => {
      resolve(token);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

//forgot password
module.exports.forgotPassword = async (email) => {
  try {
    const user = await findUserByEmail(email);
    if (user != null) {
      const code = generateRandomAlphaNumericCode().toUpperCase();
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          resetPasswordCode: code,
          resetPasswordCodeExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        },
      });

      //send email
      const html = pug.renderFile(
        `${__dirname}/../../views/emails/fpassword.pug`,
        {
          code: code,
        }
      );
      sendEMail({
        to: email,
        subject: "Projectia - Password Reset",
        from: `${process.env.EMAIL_USER}`,
        text: convert(html),
      });
      return new Promise((resolve, reject) => {
        resolve(`check your email for password reset code`);
      });
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

//reset password
module.exports.resetPassword = async (email, code, password) => {
  try {
    const user = await findUserByEmail(email);
    if (user != null) {
      if (
        user.resetPasswordCode === code &&
        user.resetPasswordCodeExpiresAt != null
      ) {
        if (user.resetPasswordCodeExpiresAt > Date.now()) {
          const hashedPassword = await hashPassword(password);
          await prisma.user
            .update({
              where: {
                email,
              },
              data: {
                password: hashedPassword,
                resetPasswordCode: null,
                resetPasswordCodeExpiresAt: null,
              },
            })
            .then(() => {
              return new Promise((resolve, reject) => {
                resolve("password reset successful");
              });
            })
            .catch((error) => {
              throw new Error(error.message);
            });
        } else {
          throw new Error("code expired");
        }
      } else {
        throw new Error("invalid code");
      }
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

//change password
module.exports.changePassword = async (email, oldPassword, newPassword) => {
  try {
    const user = await findUserByEmail(email);
    if (user != null) {
      //compare password
      const passMatch = await comparePassword(oldPassword, user.password);
      if (passMatch) {
        const hashedPassword = await hashPassword(newPassword);
        await prisma.user
          .update({
            where: {
              email,
            },
            data: {
              password: hashedPassword,
            },
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              resolve("password changed");
            });
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      } else {
        throw new Error("invalid password");
      }
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};
