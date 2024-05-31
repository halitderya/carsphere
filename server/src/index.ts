import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFileSync } from "fs";
import resolvers from "./resolvers.js";
import express from "express";
import cors from "cors";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import connectDB from "./db/dbConnector.js";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
const app = express();
const httpServer = http.createServer(app);
interface MyContext {
  token?: string;
}
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await connectDB();

await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),

  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready halit at http://loccalhosdfgt:4000`);
