import { Specification } from "../../model/Specification";
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    return SpecificationRepository.INSTANCE;
  }

  list(): Specification[] {
    return this.specifications;
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find((spc) => spc.name === name);
    return specification;
  }

  // eslint-disable-next-line class-methods-use-this
  create({ name, description }: ICreateSpecificationsDTO): void {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }
}

export { SpecificationRepository };
