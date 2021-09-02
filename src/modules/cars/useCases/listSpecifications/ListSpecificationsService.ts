import { Specification } from "../../model/Specification";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRepository";

class ListSpecificationsService {
  constructor(private specificationRepository: SpecificationRepository) {}

  execute(): Specification[] {
    const specifications = this.specificationRepository.list();
    return specifications;
  }
}

export { ListSpecificationsService };
