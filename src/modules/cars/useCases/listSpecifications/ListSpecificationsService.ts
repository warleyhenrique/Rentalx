import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specification";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRepository";

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
