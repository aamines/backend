const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const lodash = require("lodash");
const generateRandomAlphaNumericCode = require("../../utils/random.js");
const { hashPassword, comparePassword } = require("./password.service.js");
const sendEmail = require("../../utils/sendEmail.js");

// create user
module.exports.createUser = async (data) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (user) {
    return "Email already used";
  }
  const hashedPassowrd = await hashPassword(data.password);

  const code = generateRandomAlphaNumericCode().toUpperCase();

  const newUser = await prisma.user.create({
    data: {
      names: data.names,
      email: data.email,
      password: hashedPassowrd,
      country: data.country,
      emailVerificationCode: code,
      emailVerificationCodeExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      statusId: 1,
    },
  });

  if (newUser) {
    sendEmail({
      to: data.email,
      subject: "Projectia - Email Verification",
      from: `${process.env.EMAIL_USER}`,
      text: `
                <p>Confirm your email address</p>
                <p>Your confirmation code is below — enter it in your open browser window and we'll help you get signed in.</p>
                <br>
                <p>${code}</p>
                <br>
                <p>This code will expire in 24 hours</p>
                <p>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</p>
                <p>Thanks for using Projectia</p>
                `,
    });
    return `check ${newUser.email} for verification code`;
  }
  return "unable to create user";
};

// verify email
module.exports.verifyEmail = async (email, code) => {
  const prisma = new PrismaClient();
  const user = await findUserByEmail(email);
  if (user != null) {
    if (
      user.emailVerificationCode === code &&
      user.emailVerificationCodeExpiresAt != null
    ) {
      if (user.emailVerificationCodeExpiresAt > Date.now()) {
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            emailVerified: true,
            emailVerificationCode: null,
            emailVerificationCodeExpiresAt: null,
          },
        });
        return "email verified";
      }
      return "code expired";
    }
    return "invalid code";
  }
  return "user not found";
};

//login user
module.exports.login = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user || user === null) {
    return "Invalid email or password.";
  }

  if (!user.emailVerified) {
    return "Email not verified. Please Verify it and try again!!";
  }

  //compare password
  const passMatch = await comparePassword(password, user.password);
  if (!passMatch) {
    return "invalid email or password";
  }

  const token = await generateToken(user);
  return token;
};

//forgot password
module.exports.forgotPassword = async (email) => {
  const prisma = new PrismaClient();
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
    sendEMail({
      to: email,
      subject: "Projectia - Password Reset",
      from: `${process.env.EMAIL_USER}`,
      text: `
            <p>Reset your password</p>
            <p>Your confirmation code is below — enter it in your open browser window and we'll help you get signed in.</p>
            <br>
            <p>${code}</p>
            <br>
            <p>This code will expire in 24 hours</p>
            <p>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</p>
            <p>Thanks for using Projectia</p>
            `,
    });
    return `check your email ${email} for password reset code`;
  }
  return "user not found";
};

//reset password
module.exports.resetPassword = async (email, code, password) => {
  const prisma = new PrismaClient();
  const user = await findUserByEmail(email);
  if (user != null) {
    if (
      user.resetPasswordCode === code &&
      user.resetPasswordCodeExpiresAt != null
    ) {
      if (user.resetPasswordCodeExpiresAt > Date.now()) {
        const hashedPassword = await hashPassword(password);
        await prisma.user.update({
          where: {
            email,
          },
          data: {
            password: hashedPassword,
            resetPasswordCode: null,
            resetPasswordCodeExpiresAt: null,
          },
        });
        return "password reset successful";
      }
      return "code expired";
    }
    return "invalid code";
  }
  return "user not found";
};

//change password
module.exports.changePassword = async (email, oldPassword, newPassword) => {
  const prisma = new PrismaClient();
  const user = await findUserByEmail(email);
  if (user != null) {
    //compare password
    const passMatch = await comparePassword(oldPassword, user.password);
    if (passMatch) {
      const hashedPassword = await hashPassword(newPassword);
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          password: hashedPassword,
        },
      });
      return "password changed";
    }
    return "invalid password";
  }
  return "user not found";
};

//get current logged in user info
module.exports.getUserById = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return lodash.pick(user, [
    "id",
    "names",
    "email",
    "country",
    "createdAt",
    "updatedAt",
  ]);
};

// find user by email
const findUserByEmail = async (email) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return user;
  } else {
    return null;
  }
};

//generate access token
async function generateToken(user) {
  console.log(user.id);
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });
  return token;
}
