import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecificationsService {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: SpecificationRepository
    ) {}

  async execute(): Promise<Specification[]> {
    const specifications = this.specificationRepository.list();
    return specifications;
  }
}

export { ListSpecificationsService };
