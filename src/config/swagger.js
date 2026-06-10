import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Compensation Intelligence Platform API",
      version: "1.0.0",
      description:
        "Backend API for compensation benchmarking, company comparison and salary intelligence.",
    },

    servers: [
      {
        url: "https://compensation-intelligence-platform.onrender.com/api/v1",
        description: "Production Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/modules/**/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
