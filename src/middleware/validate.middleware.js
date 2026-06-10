import { ZodError } from "zod";

export const validate = (
  schema,
  source = "body"
) => {
  return (req, res, next) => {
    try {

      const parsedData =
        schema.parse(req[source]);

      if (source === "query") {
        req.validatedQuery =
          parsedData;
      } else {
        req[source] =
          parsedData;
      }

      next();

    } catch (error) {

      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors,
        });
      }

      next(error);
    }
  };
};