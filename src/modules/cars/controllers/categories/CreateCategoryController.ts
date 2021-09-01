import { Request, Response } from "express";

class CreateCategoryController {
  handle(request: Request, response: Response): Response {
    return response.status(201).send();
  }
}

export { CreateCategoryController };
