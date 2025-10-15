# API Documentation

This document provides details on the available API endpoints for managing Cocktails and Ingredients.

## Cocktail Endpoints

| Method | Endpoint                                        | Description                                            | Parameters / Body                                                                                             |
| :----- | :---------------------------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/cocktail`                                     | Get a list of all cocktails.                           | **Optional Query Params:**<br>`category` (`ALCOHOLIC`,` NO_ALCOHOLIC`)<br>`ingredientId` (to get only coctails with cerian ingerement)                      |
| `POST`   | `/cocktail`                                     | Create a new cocktail.                                 | **Body:**<br>`{ "name": "Mojito", "category": "ALCOHOLIC", "recipe": "xyz" }`                                              |
| `GET`    | `/cocktail/:id`                                 | Get a single cocktail by its ID.                       | **Path Param:**<br>`id` (the cocktail's ID)                                                                    |
| `PATCH`  | `/cocktail/:id`                                 | Update a cocktail's properties.                       | **Path Param:**<br>`id`<br>**Body:**<br>`{ "name": "Classic Mojito", ... }`                                     |
| `DELETE` | `/cocktail/:id`                                 | Delete a cocktail.                                     | **Path Param:**<br>`id`                                                                                         |
| `POST`   | `/cocktail/:id/ingredients`                     | Add an ingredient to a specific cocktail.              | **Path Param:**<br>`id`<br>**Body:**<br>`{ "ingredientId": 1, "quantity": "60" }`                            |
| `DELETE` | `/cocktail/:cocktailId/ingredients/:ingredientId` | Remove an ingredient from a specific cocktail.         | **Path Params:**<br>`cocktailId`<br>`ingredientId`                                                              |

## Ingredient Endpoints

| Method | Endpoint          | Description                                      | Parameters / Body                                                              |
| :----- | :---------------- | :----------------------------------------------- | :----------------------------------------------------------------------------- |
| `GET`    | `/ingredient`     | Get a list of all ingredients.                   | **Optional Query Param:**<br>`isAlcohol` (`true` or `false`)              |
| `POST`   | `/ingredient`     | Create a new ingredient.                         | **Body:**<br>`{ "name": "White Rum","description":"xyz" "isAlcohol": true, "photo":"https://example.com/photo" }`                       |
| `GET`    | `/ingredient/:id` | Get a single ingredient by its ID.               | **Path Param:**<br>`id` (the ingredient's ID)                                  |
| `PATCH`  | `/ingredient/:id` | Update an ingredient's properties.              | **Path Param:**<br>`id`<br>**Body:**<br>`{ "name": "Aged White Rum", ... }`      |
| `DELETE` | `/ingredient/:id` | Delete an ingredient.                            | **Path Param:**<br>`id`                                                         |
