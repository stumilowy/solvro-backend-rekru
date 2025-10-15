import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Prisma } from '@prisma/client';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  create(@Body() createIngredientDto: Prisma.IngredientCreateInput) {
    return this.ingredientService.create(createIngredientDto);
  }

  @Get()
  findAll(@Query('isAlcohol') isAlcohol?: boolean) {
    return this.ingredientService.findAll(isAlcohol);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientDto: Prisma.IngredientUpdateInput ) {
    return this.ingredientService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientService.remove(+id);
  }
}
