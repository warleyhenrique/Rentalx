import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import {sign} from "jsonwebtoken"

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest{
  email: string;
  password: string;
}

interface IResponse{
  user:{
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase{
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({email, password}:IRequest):Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect")
    }

    const token = sign({}, "1b0679be72ad976ad5d491ad57a5eec0", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn = {
      token,
      user:{
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn

  }
}

export { AuthenticateUserUseCase}