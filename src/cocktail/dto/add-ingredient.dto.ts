import { isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class AddIngredeintDto {
    @IsNotEmpty()
    @IsString()
    ingredientId: number;

    @IsNotEmpty()
    @IsString()
    quantity: number;
}