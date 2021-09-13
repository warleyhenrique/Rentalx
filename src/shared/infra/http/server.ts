import  express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import "@shared/infra/typeorm";
import "@shared/container";
import { router } from "@shared/infra/http/routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "swagger.json";
import { AppError } from "@errors/AppErros";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, request: Request, response:Response, next: NextFunction)=>{
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }
  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
})

app.listen(3333, () =>
  // eslint-disable-next-line no-console
  console.log("🚀 Server started on http://localhost:3333")
);
