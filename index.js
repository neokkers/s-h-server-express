import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middleware/error";
import connectDB from "./config/db";
import { typeDefs, resolvers } from "./src/graphql";

// load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDB();

// Route files
// const auth = require("./routes/auth");
// const firms = require("./routes/firms");
// const programs = require("./routes/programs");

const app = express();

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// Mount routers
// app.use("/api/v1/auth", auth);
// app.use("/api/v1/firms", firms);
// app.use("/api/v1/programs", programs);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers
});

graphqlServer.applyMiddleware({ app });

const server = app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`
  )
);

// Handling unhandled rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server process
  server.close(() => process.exit(1));
});

// =================== OLD

// const startServer = async () => {
//   const app = express();
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers
//   });
//
//   server.applyMiddleware({ app });
//
//   await mongoose.connect(
//     "mongodb+srv://admin:test@atlasapp-wxmpz.mongodb.net/s-h-server-express?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     }
//   );
//
//   app.listen({ port: 4000 }, () =>
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
//   );
// };
//
// startServer();
