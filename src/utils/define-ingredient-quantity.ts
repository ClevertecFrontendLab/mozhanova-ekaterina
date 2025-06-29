import { Ingredient } from '~/types';

export const defineIngredientQuantity = (
    ingredient: Ingredient,
    portions: number,
    portionsQuantity: string,
) => {
    const quantity = ((Number(ingredient.count) / portions) * parseInt(portionsQuantity)).toFixed(
        2,
    );
    return `${quantity} ${ingredient.measureUnit}`;
};
