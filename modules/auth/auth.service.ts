import joi from "joi";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

// imports
import User from "../user/user.interface";

class UserService {
  private prisma = new PrismaClient();

  public userSchema = joi.object({
    names: joi.string().required(),
    gender: joi.string().required(),
    country: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required(),
  });

  public validateUser = (data: User) => {
    return this.userSchema.validate(data);
  };

  public generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  public checkEmailExists = async (email: string) => {
    // check if email exists
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return true;
    } else {
      return false;
    }
  };

  public signin = async (id: string, email: string) => {
    // log user in
    const token = jwt.sign(
      {
        id: id,
        email: email,
      },
      `${process?.env?.JWT_SECRET}`
    );

    // change status
    await this.prisma.user.update({
      where: { email: email },
      data: {
        status: "ACTIVE",
      },
    });

    return token;
  };
}

export default UserService;
