import express, { ErrorRequestHandler, RequestHandler } from "express";

type Callback = () => void;
type Router = { path: string; router: RequestHandler };

interface AppProps {
  middlewares?: RequestHandler[];
  routers?: Router[];
  errorHandlers?: ErrorRequestHandler[];
  port?: number;
}

export default class App {
  private application: express.Application;
  private port: number = 3000;
  private middlewares: RequestHandler[] = [];
  private routers: Router[] = [];
  private errorHandlers: ErrorRequestHandler[] = [];

  constructor(props?: AppProps) {
    this.application = express();
    if (props) {
      this.init(props);
    }
  }

  init(props: AppProps) {
    this.application = express();
    const { port, middlewares, routers, errorHandlers } = props;
    this.setPort(port || this.port);
    this.setMiddleware(middlewares);
    routers?.forEach(({ path, router }) => this.setRouter(path, router));
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

  setRouter(path: string, router: RequestHandler) {
    this.routers = this.routers.concat({ path, router });
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
    this.routers.forEach(({ path, router }) =>
      this.application.use(path, router)
    );
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
