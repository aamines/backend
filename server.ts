import "dotenv/config";

import App from "./app";

// controllers
import AuthController from "./modules/auth/auth.controller";
import UserController from "./modules/user/user.controller";
import WorkspaceController from "./modules/workspace/workspace.controller";

const app = new App([
  new AuthController(),
  new UserController(),
  new WorkspaceController(),
]);

app.listen();
