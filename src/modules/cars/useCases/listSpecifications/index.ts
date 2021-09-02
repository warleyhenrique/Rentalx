import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsService } from "./ListSpecificationsService";

const specificationRepository = SpecificationRepository.getInstance();
const listSpecificationsService = new ListSpecificationsService(
  specificationRepository
);
const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsService
);

export { listSpecificationsController };
