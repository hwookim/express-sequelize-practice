import express, { ErrorRequestHandler, RequestHandler } from "express";
import { useExpressServer } from "routing-controllers";
import UserController from "./controllers/UserController";

type Callback = () => void;

interface AppProps {
  middlewares?: RequestHandler[];
  errorHandlers?: ErrorRequestHandler[];
  port?: number;
}

export default class App {
  private application: express.Application;
  private port: number = 3000;
  private middlewares: RequestHandler[] = [];
  private errorHandlers: ErrorRequestHandler[] = [];

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

  run(props?: AppProps, callback?: Callback) {
    if (props) {
      this.init(props);
    }
    this.listen(this.port, callback);
    return this;
  }

  setPort(port: number) {
    this.port = port;
    return this;
  }

  setMiddleware(middlewares: RequestHandler | RequestHandler[] = []) {
    this.middlewares = this.middlewares.concat(middlewares);
    return this;
  }

  setErrorHandler(
    errorHandlers: ErrorRequestHandler | ErrorRequestHandler[] = []
  ) {
    this.errorHandlers = this.errorHandlers.concat(errorHandlers);
    return this;
  }

  listen(port: number, callback?: Callback) {
    this.setPort(port);
    this.middlewares.forEach((middleware) => this.application.use(middleware));
    useExpressServer(this.application, {
      routePrefix: "/api",
      controllers: [UserController],
    });
    this.errorHandlers.forEach((handler) => this.application.use(handler));

    this.application.listen(this.port, () => {
      console.log("----------------------------------------");
      console.log("     Server listening on port " + this.port);
      console.log("----------------------------------------");
      if (callback) {
        callback();
      }
    });
    return this;
  }
}
