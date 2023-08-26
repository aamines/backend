import Joi from "joi";
import { PrismaClient } from "@prisma/client";

// imports
import Workspace from "./workspace.interface";

class WorkspaceService {
  private prisma = new PrismaClient();

  public userSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    size: Joi.string().required(),
    emails: Joi.array().required(),
    vision: Joi.string().required(),
  });

  public validateUser = (data: Workspace) => {
    return this.userSchema.validate(data);
  };

  public inviteMembers = async (emails: string[]) => {
    try {
      for (const email of emails) {
        const user = await this.prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (user) {
          await this.sendEmail(email);
          await this.sendNotification(user?.id);
        } else {
          await this.sendEmail(email);
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  private sendEmail = async (email: string) => {};

  private sendNotification = async (userId: string) => {};
}

export default WorkspaceService;
