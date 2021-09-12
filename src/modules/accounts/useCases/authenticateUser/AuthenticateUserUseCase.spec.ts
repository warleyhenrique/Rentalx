import { AppError } from "@errors/AppErros";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/authenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () =>{
  beforeEach(()=>{
    userRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
  })

  it("should be able to authenticate an user", async ()=>{
    const user:ICreateUserDTO = {
      name: "test",
      email: "mail@test",
      driver_license: "1234456",
      password: "passTest"
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async ()=> {
    expect(async () =>{
      const result = await authenticateUserUseCase.execute({
        email: "teste@mail.com",
        password: "testPass"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an incorrect password", async ()=> {
    expect(async () =>{
      
      const user:ICreateUserDTO = {
        name: "test",
        email: "mail@test",
        driver_license: "1234456",
        password: "passTest"
      }
  
      await createUserUseCase.execute(user);
      
      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

});