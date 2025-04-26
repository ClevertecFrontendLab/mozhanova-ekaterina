import { createSelector } from 'reselect';

import { allergens } from '~/mocks/allergens';
import { garnish } from '~/mocks/garnish';

import { ApplicationState } from './configure-store';

const selectRecipeData = (state: ApplicationState) => state.recipe.data;
const selectFilters = (state: ApplicationState) => state.recipe.filters;

export const selectFilteredRecipes = createSelector(
    [selectRecipeData, selectFilters],
    (data, filters) => {
        {
            return data.filter((recipe) => {
                const matchesCategories =
                    filters.category.length > 0
                        ? recipe.category.some((category) => filters.category.includes(category))
                        : true;
                const matchesSubCategories =
                    filters.subcategory.length > 0
                        ? recipe.subcategory.some((subcategory) =>
                              filters.subcategory.includes(subcategory),
                          )
                        : true;
                const matchesIngredients =
                    filters.ingredients.length > 0
                        ? recipe.ingredients.some((ingredient) =>
                              filters.ingredients!.includes(ingredient.title.toLowerCase()),
                          )
                        : true;
                const matchesAllergens =
                    filters.allergens.length > 0
                        ? recipe.ingredients.some((ingredient) => {
                              const allPossibleAllergens = allergens
                                  .filter((a) => filters.allergens.includes(Object.keys(a)[0]))
                                  .flatMap((a) => a[Object.keys(a)[0]].map((i) => i.toLowerCase()));

                              const combinedAllergens = [
                                  ...allPossibleAllergens,
                                  ...filters.allergens.map((a) => a.toLowerCase()),
                              ];

                              return combinedAllergens.some((allergen) =>
                                  ingredient.title.toLowerCase().includes(allergen),
                              );
                          })
                        : false;

                const matchesAuthors = true;

                const matchesMeat =
                    filters.meat.length > 0
                        ? recipe.ingredients.some((ingredient) =>
                              filters.meat
                                  .map((item) => item.toLowerCase())
                                  .includes(ingredient.title.toLowerCase()),
                          )
                        : true;

                const matchesGarnish = () => {
                    if (filters.garnish.length > 0) {
                        if (recipe.side) {
                            return garnish.some((item) => filters.garnish.includes(item.label));
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                };
                // filters.garnish.length > 0
                //     ? garnish
                //           .filter((item) => filters.garnish.includes(item.label))
                //           .map((item) => item.id.toLowerCase())
                //           .includes(recipe.side.toLowerCase())
                //     : true;

                const matchesSearchQuery =
                    filters.searchQuery.length > 0
                        ? recipe.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
                        : true;

                return (
                    matchesCategories &&
                    matchesSubCategories &&
                    matchesIngredients &&
                    !matchesAllergens &&
                    matchesAuthors &&
                    matchesMeat &&
                    matchesGarnish() &&
                    matchesSearchQuery
                );
            });
        }
    },
);
