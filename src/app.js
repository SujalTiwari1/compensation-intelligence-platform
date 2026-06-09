import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
//default express configuration

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


//import routes
import routes from "./routes/index.js";


app.use("/api/v1", routes);


//import middleware
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
