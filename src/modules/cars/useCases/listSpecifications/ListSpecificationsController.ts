import { Request, Response } from "express";
import { ListSpecificationsService } from "./ListSpecificationsService";

class ListSpecificationsController {
  constructor(private listSpecificationService: ListSpecificationsService) {}

  handle(request: Request, response: Response): Response {
    const all = this.listSpecificationService.execute();
    return response.json(all);
  }
}

export { ListSpecificationsController };
