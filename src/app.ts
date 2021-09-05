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
  private callback?: Callback;

  constructor(props?: AppProps) {
    this.application = express();
    if (props) {
      this.init(props);
    }
  }

  init(props: AppProps, callback?: Callback) {
    this.application = express();
    const { port, middlewares, routers, errorHandlers } = props;
    this.setPort(port || this.port);
    this.setMiddleware(middlewares);
    this.setRouter(routers);
    this.setErrorHandler(errorHandlers);
    this.callback = callback;
  }

  run(props?: AppProps, callback?: Callback) {
    if (props) {
      this.init(props, callback);
    }
    this.listen(this.port, callback);
    return this;
  }

  setPort(port: number) {
    this.port = port;
    return this;
  }

  setMiddleware(middlewares: RequestHandler | RequestHandler[] = []) {
    if (middlewares === []) {
      return this;
    }
    this.middlewares = this.middlewares.concat(middlewares);
    this.middlewares.forEach((middleware) => this.application.use(middleware));
    return this;
  }

  setRouter(router: Router | Router[] = []) {
    if (router === []) {
      return this;
    }
    this.routers = this.routers.concat(router);
    this.routers.forEach(({ path, router }) =>
      this.application.use(path, router)
    );
    return this;
  }

  setErrorHandler(
    errorHandlers: ErrorRequestHandler | ErrorRequestHandler[] = []
  ) {
    if (errorHandlers === []) {
      return this;
    }
    this.errorHandlers = this.errorHandlers.concat(errorHandlers);
    this.errorHandlers.forEach((handler) => this.application.use(handler));
    return this;
  }

  listen(port: number, callback?: Callback) {
    this.callback = callback;
    this.setPort(port);
    this.application.listen(this.port, () => {
      console.log("----------------------------------------");
      console.log("     Server listening on port " + this.port);
      console.log("----------------------------------------");
      if (this.callback) {
        this.callback();
      }
    });
    return this;
  }
}
