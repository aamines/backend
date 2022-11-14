//libraries
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

//services
import { checkSignup } from "../services/user.service.js";

//configs
const prisma = new PrismaClient();

export const signup = (req, res) => {
  const data = {
    names: req.body.names,
    email: req.body.email,
    country: req.body.country,
    password: req.body.password,
    usedGoogle: req.body.usedGoogle,
  };

  if (!data.usedGoogle) {
    try {
      checkSignup(data).then((_) => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(data.password, salt, async (err, hash) => {
            await prisma.user
              .findFirst({ where: { email: data.email } })
              .then(async (found) => {
                if (!found) {
                  await prisma.user
                    .create({
                      data: {
                        names: data.names,
                        email: data.email,
                        country: data.country,
                        password: hash,
                      },
                    })
                    .then(async (user) => {
                      await prisma.account
                        .create({
                          data: {
                            userId: user.id,
                            statusId: 1,
                            roleId: 2,
                          },
                        })
                        .then((_) => {
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

                          return res.status(200).json({
                            status: "success",
                            message: "Signup successful",
                            token: token,
                          });
                        });
                    });
                } else {
                  return res.status(400).json({
                    status: "error",
                    message: "User already exists",
                  });
                }
              });
          });
        });
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
};
