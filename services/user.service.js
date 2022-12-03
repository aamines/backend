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
        reject(error.message);
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
        resolve({ found: false, user: {} });
      } else {
        resolve({ found: true, user: found });
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
              statusId: 1,
            },
          })
          .then((user) => {
            resolve(user);
          })
          .catch((error) => {
            reject(error.message);
          });
      });
    });
  });
};

//compare passwords
export const comparePasswords = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      resolve(result);
    });
  });
};

//signin a user
export const signin = (payload) => {
  return new Promise((resolve, reject) => {
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    resolve(token);
  });
};

//delete a user
export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    prisma.user
      .delete({
        where: {
          id: id,
        },
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};
