import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Category } from '@prisma/client';
import { AddIngredeintDto } from './dto/add-ingredient.dto';
import { connect } from 'http2';


@Injectable()
export class CocktailService {

  constructor(private readonly databaseService: DatabaseService) { }


  async create(createCocktailDto: Prisma.CocktailCreateInput) {
    return this.databaseService.cocktail.create({
      data: createCocktailDto
    })
  }

  async findAll(
    category?: Category,
    ingredientId?: number,
    sortBy?: 'name' | 'creationDate',
    sortType: 'asc' | 'desc' = 'asc'
  ) {
    const where: Prisma.CocktailWhereInput = {};
    const orderBy = {}
    if (sortBy === 'name') {
      orderBy['name'] = sortType
    } else if (sortBy === 'creationDate') {
      orderBy['creationDate'] = sortType
    }
    if (category) {
      where.category = category;
    }

    if (ingredientId) {
      where.ingredients = {
        some: {
          ingredientId: +ingredientId,
        },
      };
    }

    return this.databaseService.cocktail.findMany({
      where,
      orderBy,
      include: { ingredients: { include: { ingredient: true } } },
    });
  }

  async findOne(id: number) {
    return this.databaseService.cocktail.findUnique({
      where: { id, },
      include: { ingredients: { include: { ingredient: true } } }
    })
  }

  async update(id: number, updateCocktailDto: Prisma.CocktailUpdateInput) {
    return this.databaseService.cocktail.update({
      where: { id, },
      data: updateCocktailDto
    })
  }

  async addIngredientToCocktail(cocktailId: number, addIngredientDto: AddIngredeintDto) {
    const { ingredientId, quantity } = addIngredientDto;

    const cocktail = await this.databaseService.cocktail.findUnique({
      where: { id: cocktailId }
    });
    if (!cocktail) {
      throw new NotFoundException(`Coctail with id ${cocktailId} cannot be found`)
    }

    const ingredient = await this.databaseService.ingredient.findUnique({
      where: { id: ingredientId }
    })
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with id ${ingredientId} cannot be found`)
    }

    const existing = await this.databaseService.ingredientsForCocktails.findUnique({
      where: { cocktailId_ingredientId: { cocktailId, ingredientId } },
    });
    if (existing) {
      throw new ConflictException('Ingredient already added to this cocktail');
    }

    await this.databaseService.ingredientsForCocktails.create({
      data: {
        cocktail: {
          connect: { id: cocktailId },
        },
        ingredient: {
          connect: { id: ingredientId },
        },
        quantity: quantity,
      },
    });

    return this.databaseService.cocktail.findUnique({
      where: { id: cocktailId },
      include: { ingredients: { include: { ingredient: true } } }
    })

  }


  async removeIngredeintFromCocktail(cocktailId: number, ingredientId: number) {
    const cocktail = await this.databaseService.cocktail.findUnique({
      where: { id: cocktailId }
    });
    if (!cocktail) {
      throw new NotFoundException(`Coctail with id ${cocktailId} cannot be found`)
    }

    const ingredient = await this.databaseService.ingredient.findUnique({
      where: { id: ingredientId }
    })
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with id ${ingredientId} cannot be found`)
    }
    await this.databaseService.ingredientsForCocktails.delete({
      where: {
        cocktailId_ingredientId: {
          cocktailId: cocktailId,
          ingredientId: ingredientId
        }
      }
    })
    return this.databaseService.cocktail.findUnique({
      where: { id: cocktailId },
      include: { ingredients: { include: { ingredient: true } } }
    })
  }

  async remove(id: number) {
    return this.databaseService.cocktail.delete({
      where: { id, }
    })
  }
}
