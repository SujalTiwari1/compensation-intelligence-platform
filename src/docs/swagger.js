import swaggerUi from "swagger-ui-express";

import { swaggerSpec }
from "../config/swagger.js";

export const swaggerDocs = (
  app
) => {

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );

  console.log(
    "Swagger running at /api-docs"
  );
};