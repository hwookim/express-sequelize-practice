import express, { ErrorRequestHandler, RequestHandler } from "express";
import { Container } from "typedi";
import { useContainer, useExpressServer } from "routing-controllers";

type Callback = () => void;

interface AppProps {
  middlewares?: RequestHandler[];
  controllers?: Function[];
  errorHandlers?: ErrorRequestHandler[];
  port?: number;
}

export default class App {
  private application: express.Application;
  private port: number = 3000;
  private middlewares: RequestHandler[] = [];
  private controllers: Function[] = [];
  private errorHandlers: ErrorRequestHandler[] = [];

  constructor(props?: AppProps) {
    this.application = express();
    if (props) {
      this.init(props);
    }
  }

  init(props: AppProps) {
    this.application = express();
    const { port, middlewares, controllers, errorHandlers } = props;
    this.setPort(port || this.port);
    this.setMiddleware(middlewares);
    this.setController(controllers);
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

  setController(controller: Function | Function[] = []) {
    this.controllers = this.controllers.concat(controller);
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
    useContainer(Container);
    useExpressServer(this.application, {
      routePrefix: "/api",
      controllers: this.controllers,
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
