import express, { NextFunction, Request, Response } from "express";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

interface AppProps {
  middlewares?: Middleware[];
  errorHandlers?: ErrorHandler[];
  port?: number;
}

export default class App {
  private application: express.Application;
  private port: number = 3000;
  private middlewares: Middleware[] = [];
  private errorHandlers: ErrorHandler[] = [];

  constructor(props?: AppProps) {
    this.application = express();
    if (props) {
      this.init(props);
    }
  }

  init(props: AppProps) {
    this.application = express();
    const { port, middlewares, errorHandlers } = props;
    this.setPort(port || this.port);
    this.setMiddleware(middlewares);
    this.setErrorHandler(errorHandlers);
  }

  run(props?: AppProps) {
    if (props) {
      this.init(props);
    }
    this.listen(this.port);
    return this;
  }

  setPort(port: number) {
    this.port = port;
    return this;
  }

  setMiddleware(middlewares: Middleware | Middleware[] = []) {
    this.middlewares = this.middlewares.concat(middlewares);
    this.middlewares.forEach((middleware) => this.application.use(middleware));
    return this;
  }

  setErrorHandler(errorHandlers: ErrorHandler | ErrorHandler[] = []) {
    this.errorHandlers = this.errorHandlers.concat(errorHandlers);
    this.errorHandlers.forEach((handler) => this.application.use(handler));
    return this;
  }

  listen(port: number) {
    this.setPort(port);
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
    return this;
  }
}
