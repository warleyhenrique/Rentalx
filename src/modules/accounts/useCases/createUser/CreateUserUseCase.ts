import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase{
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ){}

  async execute({name, email, driver_license, password}: ICreateUserDTO): Promise<void>{
    await this.userRepository.create({
      name, 
      email, 
      driver_license, 
      password
    });
  }
}

export { CreateUserUseCase }