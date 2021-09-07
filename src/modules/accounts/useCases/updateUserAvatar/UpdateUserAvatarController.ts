import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UpdateUserAvatarUserCase } from './UpdateUserAvatarUseCase';


class UpdateUserAvatarController{
  async handle(request: Request, response: Response):Promise<Response>{
    const avatar_file = request.file.filename;
    const { id: user_id } = request.user;

    const updateUserAvatarUserCase = container.resolve(UpdateUserAvatarUserCase);

    await updateUserAvatarUserCase.execute({user_id, avatar_file})

    return response.status(204).send();
  }
}

export {UpdateUserAvatarController}