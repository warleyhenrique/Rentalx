import { container } from 'tsyringe';
import { Response } from 'express';
import { Request } from 'express';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';


class AuthenticateUserController{
  async handle(request:Request, response: Response): Promise<Response> {
    const {password, email} = request.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authenticateInfo = await authenticateUserUseCase.execute({email, password});

    return response.json(authenticateInfo);
  }
}

export {AuthenticateUserController}