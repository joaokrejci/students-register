import "./data/dbConnect";
import server from "./apollo/server";

server
  .listen()
  .then(({ url }) => console.log(`Server listening at ${url}`))
  .catch((error) => console.error("An error has occured", error));
