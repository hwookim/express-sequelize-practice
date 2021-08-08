import express from "express";

interface AppProps {
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
    const { port } = props;
    this.port = port || this.port;
  }

  listen(port?: number) {
    if (port) {
      this.port = port || this.port;
    }
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
