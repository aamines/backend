import Joi from "joi";

// imports
import Workspace from "./workspace.interface";

class WorkspaceService {
  public userSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    size: Joi.string().required(),
    vision: Joi.string().required(),
  });

  public validateUser(data: Workspace) {
    return this.userSchema.validate(data);
  }
}

export default WorkspaceService;
