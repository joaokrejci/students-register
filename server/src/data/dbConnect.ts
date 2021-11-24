import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection().catch((error) =>
  console.log("A problem has occured while connecting to database", error)
);
