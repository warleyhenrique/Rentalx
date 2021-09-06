import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationService {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationsRepository
    ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error();
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}
export { CreateSpecificationService };
