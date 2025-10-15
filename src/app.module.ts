import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CocktailModule } from './cocktail/cocktail.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CocktailModule, IngredientModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
