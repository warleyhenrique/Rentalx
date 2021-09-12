import { CategoriesRepositoryInMemory } 
from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryService } from "./CreateCategoryService";
import { AppError } from "@errors/AppErros";

describe("Create Category", ()=>{
  
  let createCategory: CreateCategoryService;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() =>{
      categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
      createCategory = new CreateCategoryService(categoriesRepositoryInMemory);
  })

  it("should be able to create a new category", async ()=>{
    const category = {
      name: "Category teste",
      description: "teste"
    }
    
    await createCategory.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
  })

  it("should not be able to create a new category with name exists", async ()=>{
   expect(async ()=>{
    const category = {
      name: "Category teste",
      description: "teste"
    }
    
    await createCategory.execute({
      name: category.name,
      description: category.description
    });

    await createCategory.execute({
      name: category.name,
      description: category.description
    });
   }).rejects.toBeInstanceOf(AppError);
  })


})