import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

// imports
import Controller from "../../interfaces/controller.interface";

class UserController implements Controller {
  path = "/users";
  router = Router();

  private prisma = new PrismaClient();

  constructor() {
    //initialise routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getUser);
  }

  private getUser = async (req: Request, res: Response) => {
    const user = await this.prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        names: true,
        email: true,
        gender: true,
        country: true,
        accounts: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  };
}

export default UserController;
