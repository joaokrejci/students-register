import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { join } from "path";
import resolvers from "./resolvers";

const typeDefs = loadSchemaSync(join(__dirname, "./schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schema = addResolversToSchema({
  schema: typeDefs,
  resolvers,
});

const server = new ApolloServer({ schema });

export default server;
