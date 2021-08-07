import express from "express";

export default class App {
  public application: express.Application;

  constructor() {
    this.application = express();
  }

  listen(port: number) {
    this.application
      .listen(port, () => {
        console.log("----------------------------------------");
        console.log("     Server listening on port " + port);
        console.log("----------------------------------------");
      })
      .on("error", (err) => {
        console.log(err);
        process.exit(1);
      });
  }
}
