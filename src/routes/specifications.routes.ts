import { Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";
import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";

const specificationsRoutes = Router();
const specificationsRepository = SpecificationRepository.getInstance();

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

specificationsRoutes.get("/", (request, response) => {
  return listSpecificationsController.handle(request, response);
});

export { specificationsRoutes };
