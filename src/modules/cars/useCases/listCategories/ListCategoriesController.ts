import { container } from 'tsyringe';
import { Request, Response } from "express";
import { ListCategoriesService } from "./ListCategoriesService";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesService = container.resolve(ListCategoriesService);
    const all = await listCategoriesService.execute();

    return response.json(all);
  }
}

export { ListCategoriesController };
