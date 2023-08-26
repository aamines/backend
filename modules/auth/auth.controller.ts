import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Router, Response } from "express";

// imports
import UserService from "./auth.service";
import Controller from "../../interfaces/controller.interface";

class AuthController implements Controller {
  public path = "/auth";
  public router = Router();
  public prisma = new PrismaClient();

  private service = new UserService();

  constructor() {
    //initialise routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/signup`, this.createUser);
    this.router.post(`${this.path}/verify`, this.verifyEmail);
  }

  private login = async (req: Request, res: Response) => {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    try {
      // check if email exists
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      // check if password is correct
      const validPassword = bcrypt.compare(data.password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      // check if user is verified
      if (!user.isVerified) {
        return res.status(400).json({
          message: "User not verified",
        });
      }

      // log user in
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        `${process?.env?.JWT_SECRET}`
      );

      return res.status(200).json({
        message: "User logged in",
        token: token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  };

  private verifyEmail = async (req: Request, res: Response) => {
    const data = {
      email: req.body.email,
      verificationCode: req.body.verificationCode,
    };

    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data?.email },
      });

      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      // check if user is verified
      if (user.isVerified) {
        return res.status(400).json({
          message: "User already verified",
        });
      }

      if (user.verificationCode !== data.verificationCode) {
        return res.status(400).json({
          message: "Invalid verification code",
        });
      }

      // update user
      await this.prisma.user.update({
        where: { email: data?.email },
        data: {
          isVerified: true,
          verificationCode: null,
        },
      });

      // log user in
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        `${process?.env?.JWT_SECRET}`
      );

      return res.status(200).json({
        message: "User verified",
        token: token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  };

  private createUser = async (req: Request, res: Response) => {
    const data = {
      names: req.body.names,
      email: req.body.email,
      gender: req.body.gender,
      country: req.body.country,
      password: req.body.password,
    };

    try {
      const { error } = this.service.validateUser(data);

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      // check if email exists
      const emailExists = await this.service.checkEmailExists(data.email);
      if (emailExists) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const verificationCode = this.service.generateVerificationCode();

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      const result = await this.prisma.user.create({
        data: {
          names: data.names,
          email: data.email,
          gender: data.gender,
          country: data.country,
          password: hashedPassword,
          verificationCode: verificationCode.toString(),
        },
      });

      // send verificaion code in email

      // send response
      return res.status(201).json({
        message: "User created",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  };
}

export default AuthController;
