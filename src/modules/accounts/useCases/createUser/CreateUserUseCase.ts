import { inject, injectable } from "tsyringe";
import {hash} from "bcrypt";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { AppError } from "@errors/AppErros";

@injectable()
class CreateUserUseCase{
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ){}

  async execute({name, email, driver_license, password}: ICreateUserDTO): Promise<void>{
    
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if(userAlreadyExists){
      throw new AppError("User already exists!");
    }
    
    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name, 
      email, 
      driver_license, 
      password: passwordHash
    });
  }
}

export { CreateUserUseCase }