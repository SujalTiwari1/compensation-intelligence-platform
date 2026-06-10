import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { swaggerDocs } from "./docs/swagger.js";
import prisma from "./config/db.js";
const app = express();
//default express configuration

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.use(helmet());
app.use(morgan("dev"));
swaggerDocs(app);
//import routes
import routes from "./routes/index.js";

app.use("/api/v1", routes);

// Default route

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Information
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: API Metadata
 */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,

    name: "Compensation Intelligence Platform",

    version: "1.0.0",

    status: "healthy",

    documentation: "/api-docs",

    apiBaseUrl: "/api/v1",

    endpoints: {
      auth: "/api/v1/auth",

      companies: "/api/v1/companies",

      roles: "/api/v1/roles",

      levels: "/api/v1/levels",

      locations: "/api/v1/locations",

      compensations: "/api/v1/compensations",

      analytics: "/api/v1/analytics",
    },
  });
});

//health Route

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Service Health Status
 */

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,

      status: "healthy",

      database: "connected",

      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      status: "unhealthy",

      database: "disconnected",
    });
  }
});

//import middleware
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
