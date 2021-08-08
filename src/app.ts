import express, { NextFunction, Request, Response } from "express";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

interface AppProps {
  middlewares?: Middleware[];
  port?: number;
}

export default class App {
  private application: express.Application;
  private port: number = 3000;

  constructor(props?: AppProps) {
    this.application = express();
    if (props) {
      this.init(props);
    }
  }

  init(props: AppProps) {
    const { middlewares, port } = props;
    this.setMiddleware(middlewares || []);
    this.port = port || this.port;
  }

  run(props?: AppProps) {
    if (props) {
      this.application = express();
      this.init(props);
      return;
    }
    this.listen();
  }

  setMiddleware(middlewares: Middleware[]) {
    middlewares.forEach((middleware) => this.application.use(middleware));
  }

  listen(port?: number) {
    this.port = port || this.port;
    this.application
      .listen(this.port, () => {
        console.log("----------------------------------------");
        console.log("     Server listening on port " + this.port);
        console.log("----------------------------------------");
      })
      .on("error", (err) => {
        console.log(err);
        process.exit(1);
      });
  }
}
