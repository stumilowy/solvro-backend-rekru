import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CocktailService } from './cocktail.service';
import { Category, Prisma } from '@prisma/client';
import { AddIngredeintDto } from './dto/add-ingredient.dto'

@Controller('cocktail')
export class CocktailController {
  constructor(private readonly cocktailService: CocktailService) { }

  @Post()
  create(@Body() createCocktailDto: Prisma.CocktailCreateInput) {
    return this.cocktailService.create(createCocktailDto);
  }

  @Post(':id/ingredients')
  addIngredient(@Param('id') id: string, @Body() addIngredientDto: AddIngredeintDto) {
    return this.cocktailService.addIngredientToCocktail(+id, addIngredientDto);
  }

  @Get()
  findAll(
    @Query('category') category?: Category,
    @Query('containsIngredient') ingredientId?: string,
    @Query('sortBy') sortBy?: 'name' | 'creationDate',
    @Query('sortType') sortType?: 'asc' | 'desc'
  ) {
    return this.cocktailService.findAll(category, ingredientId ? +ingredientId : undefined, sortBy, sortType);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cocktailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCocktailDto: Prisma.CocktailUpdateInput) {
    return this.cocktailService.update(+id, updateCocktailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cocktailService.remove(+id);
  }
  @Delete(':cocktailId/ingredients/:ingredientId')
  emoveIngredientFromCocktail(
    @Param('cocktailId') cocktailId: string,
    @Param('ingredientId') ingredientId: string,
  ) {
    return this.cocktailService.removeIngredeintFromCocktail(+cocktailId, +ingredientId);
  }
}
