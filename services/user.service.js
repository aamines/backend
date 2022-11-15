//libraries
import joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

//configs
const prisma = new PrismaClient();

//check signup data
export const checkSignup = (data) => {
  return new Promise(async (resolve, reject) => {
    await signupSchema
      .validateAsync(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(new Error(error.message));
      });
  });
};

const signupSchema = joi.object({
  names: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  country: joi.string().min(3).max(30).required(),
  password: joi.string().min(8).max(30).required(),
  usedGoogle: joi.boolean().required(),
});

//check if user exists
export const checkUser = (email) => {
  return new Promise(async (resolve, reject) => {
    await prisma.user.findFirst({ where: { email: email } }).then((found) => {
      if (!found) {
        resolve(false);
      } else {
        reject(new Error("Email already used"));
      }
    });
  });
};

//create user
export const createUser = (data) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(data.password, salt, async (err, hash) => {
        await prisma.user
          .create({
            data: {
              names: data.names,
              email: data.email,
              country: data.country,
              password: hash,
            },
          })
          .then((user) => {
            resolve(user);
          })
          .catch((error) => {
            reject(new Error(error.message));
          });
      });
    });
  });
};

//create account
export const createAccount = (user) => {
  console.log(user);
  return new Promise(async (resolve, reject) => {
    await prisma.account
      .create({
        data: {
          userId: user.id,
          statusId: 1,
          roleId: 2,
        },
      })
      .then((account) => {
        let token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            names: user.names,
            country: user.country,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 86400,
          }
        );
        resolve({ token, account });
      })
      .catch((error) => {
        reject(new Error(error.message));
      });
  });
};
