import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class IngredientService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createIngredientDto: Prisma.IngredientCreateInput) {
    return this.databaseService.ingredient.create({
      data: createIngredientDto
    });
  }

  async findAll(isAlcohol?: boolean) {
    if(typeof isAlcohol === 'boolean') {
      return this.databaseService.ingredient.findMany({
        where: {
          isAlcohol,
        }
      });
    } return this.databaseService.ingredient.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.ingredient.findUnique({
      where: { id, }
    });
  }

  async update(id: number, updateIngredientDto: Prisma.IngredientUpdateInput) {
    return this.databaseService.ingredient.update({
      where: {id,},
      data: updateIngredientDto
    });
  }

  async remove(id: number) {
    return this.databaseService.ingredient.delete({
      where: {id,}
    });
  }
}
