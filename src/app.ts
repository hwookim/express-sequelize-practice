import express, { ErrorRequestHandler, RequestHandler } from "express";

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

  setMiddleware(middlewares: RequestHandler | RequestHandler[] = []) {
    this.middlewares = this.middlewares.concat(middlewares);
    this.middlewares.forEach((middleware) => this.application.use(middleware));
    return this;
  }

  setErrorHandler(
    errorHandlers: ErrorRequestHandler | ErrorRequestHandler[] = []
  ) {
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
