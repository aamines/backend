import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

// imports
import WorkspaceService from "./workspace.service";
import Controller from "../../interfaces/controller.interface";

class WorkspaceController implements Controller {
  public path = "/workspaces";
  public router = Router();
  public prisma = new PrismaClient();

  private service = new WorkspaceService();

  constructor() {
    //initialise routes
    this.initializeRoutes();
  }

  initializeRoutes = () => {
    this.router.post(`${this.path}`, this.createWorkspace);
    this.router.get(`${this.path}/:name`, this.getWorkspace);
  };

  private createWorkspace = async (req: Request, res: Response) => {
    const data = {
      name: req.body.name,
      type: req.body.type,
      size: req.body.size,
      vision: req.body.vision,
    };

    try {
      // validate data
      const { error } = this.service.validateUser(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      // check if workspace exists
      const workspaceExists = await this.prisma.workspace.findUnique({
        where: {
          name: data.name,
        },
      });

      if (workspaceExists) {
        return res.status(400).json({
          message: "Workspace already exists",
        });
      }

      // create workspace
      await this.prisma.workspace.create({
        data: {
          name: data.name,
          type: data.type,
          size: data.size,
          status: "ACTIVE",
          vision: data.vision,
        },
      });

      return res.status(201).json({
        message: "Workspace created",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  private getWorkspace = async (req: Request, res: Response) => {
    const data = {
      name: req.params.name,
    };

    try {
      const workspace = await this.prisma.workspace.findUnique({
        where: {
          name: data.name,
        },
        select: {
          name: true,
          type: true,
          size: true,
          status: true,
          vision: true,
        },
      });

      if (!workspace) {
        return res.status(404).json({
          message: "Workspace not found",
        });
      }

      return res.status(200).json({
        workspace,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
}

export default WorkspaceController;
