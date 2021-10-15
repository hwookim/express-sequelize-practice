import express, { ErrorRequestHandler, RequestHandler } from "express";
import { Container } from "typedi";
import { useContainer, useExpressServer } from "routing-controllers";

interface AppProps {
  port?: number;
  baseUrl?: string;
  middlewares?: RequestHandler[];
  controllers?: Function[];
  errorHandlers?: ErrorRequestHandler[];
}

export default class App {
  private application: express.Application;
  private port: number = 3000;
  private baseUrl?: string;
  private middlewares: RequestHandler[] = [];
  private controllers: Function[] = [];
  private errorHandlers: ErrorRequestHandler[] = [];

  constructor(props?: AppProps) {
    this.application = express();
    if (props) {
      this.init(props);
    }
  }

  private init(props: AppProps) {
    this.application = express();
    const { port, baseUrl, middlewares, controllers, errorHandlers } = props;
    this.setPort(port || this.port);
    this.setBaseUrl(baseUrl || this.baseUrl || "");
    this.setMiddleware(middlewares);
    this.setController(controllers);
    this.setErrorHandler(errorHandlers);
  }

  public run(props?: AppProps, callback?: Function) {
    if (props) {
      this.init(props);
    }
    this.listen(this.port, callback);
    return this;
  }

  public setPort(port: number) {
    this.port = port;
    return this;
  }

  public setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  public setMiddleware(middlewares: RequestHandler | RequestHandler[] = []) {
    this.middlewares = this.middlewares.concat(middlewares);
    return this;
  }

  public setController(controller: Function | Function[] = []) {
    this.controllers = this.controllers.concat(controller);
    return this;
  }

  public setErrorHandler(
    errorHandlers: ErrorRequestHandler | ErrorRequestHandler[] = []
  ) {
    this.errorHandlers = this.errorHandlers.concat(errorHandlers);
    return this;
  }

  public listen(port: number, callback?: Function) {
    this.setPort(port);
    this.middlewares.forEach((middleware) => this.application.use(middleware));
    useContainer(Container);
    useExpressServer(this.application, {
      routePrefix: this.baseUrl,
      controllers: this.controllers,
      defaultErrorHandler: false,
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
