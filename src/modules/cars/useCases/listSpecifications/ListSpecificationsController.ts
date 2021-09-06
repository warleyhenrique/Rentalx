import { container } from 'tsyringe';
import { Request, Response } from "express";
import { ListSpecificationsService } from "./ListSpecificationsService";

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationService = container.resolve(ListSpecificationsService)
    const all = await listSpecificationService.execute();
    return response.json(all);
  }
}

export { ListSpecificationsController };
