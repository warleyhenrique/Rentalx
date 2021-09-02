import { Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/specifications/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationRepository();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository
  );
  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

specificationsRoutes.get("/", (request, response) => {
  const all = specificationsRepository.list();

  return response.json(all);
});

export { specificationsRoutes };
