import mongoose from "mongoose";
import { Application } from "../../declarations";

export default (app: Application): void => {
  mongoose
    .connect(`${app.get('mongodb')}`, {
      // Maintain up to 10 connections
      maxPoolSize: app.get("mongodbOptions")?.maxPoolSize || 10,
      // Keep trying for 5 seconds
      // eslint-disable-next-line max-len
      serverSelectionTimeoutMS:
        app.get("mongodbOptions")?.tryingTimeoutMS || 5000,
      // Close sockets after 45 seconds of inactivity
      socketTimeoutMS: app.get("mongodbOptions")?.socketTimeoutMS || 45000,
    })
    .catch((err: any) => {
      console.error("Mongodb error: ", err);
      process.exit(1);
    });

  app.set("mongooseClient", mongoose);
};
