const lodash = require("lodash");
const { convert } = require("html-to-text");
const { PrismaClient } = require("@prisma/client");

//utils
const { generateRandomAlphaNumericCode } = require("../utils/auth.util");

//prisma client
const prisma = new PrismaClient();

module.exports.updateUser = async (userId, data) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      throw new Error("user not found");
    } else {
      if (existingUser.email != data.email) {
        const code = generateRandomAlphaNumericCode();
        await prisma.user
          .update({
            where: {
              id,
            },
            data: {
              email: data.email,
              emailVerified: false,
              emailVerificationCode: code,
              names: data.names || existingUser.names,
              country: data.country || existingUser.country,
              emailVerificationCodeExpiresAt: Date.now() + 10 * 60 * 1000,
            },
          })
          .then((res) => {
            //send email
            const html = pug.renderFile(
              `${__dirname}/../../views/emails/verification.pug`,
              {
                code: code,
              }
            );
            sendEMail({
              to: data.email,
              subject: "Projectia - Email Verification",
              from: `${process.env.EMAIL_USER}`,
              text: convert(html),
            });
            return new Promise((resolve, reject) => {
              resolve(`check ${data.email} for verification code`);
            });
          });
      } else {
        //update user if email is not changed
        await prisma.user
          .update({
            where: {
              id,
            },
            data: {
              names: data.names || existingUser.names,
              country: data.country || existingUser.country,
            },
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              resolve(`user updated`);
            });
          });
      }
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

//get current logged in user info
module.exports.getUserById = async (id) => {
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
module.exports.findUserByEmail = async (email) => {
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
