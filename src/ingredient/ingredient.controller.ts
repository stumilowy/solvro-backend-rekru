import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
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
  findAll(
    @Query('isAlcohol', new ParseBoolPipe({ optional: true }))
    isAlcohol?: boolean,
    @Query('sortBy') sortBy?: 'name' | 'creationDate',
    @Query('sortType') sortType?: 'asc' | 'desc',
  ) {
    return this.ingredientService.findAll(isAlcohol, sortBy, sortType);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: Prisma.IngredientUpdateInput,
  ) {
    return this.ingredientService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientService.remove(+id);
  }
}
