import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";

// interfaces
import Controller from "./interfaces/controller.interface";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Projectia server running on port ${process.env.PORT}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use("/", controller.router);
    });
  }
}

export default App;
