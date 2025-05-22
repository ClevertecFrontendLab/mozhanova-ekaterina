import { createSelector } from 'reselect';

import { ApplicationState } from './configure-store';

export const isAuthenticated = (state: ApplicationState) => !!state.user.accessToken;
export const selectAllCategories = (state: ApplicationState) => state.category.categories || [];

export const selectCategories = createSelector(
    [selectAllCategories],
    (categories = []) =>
        (Array.isArray(categories) && categories?.filter((category) => !category.rootCategoryId)) ||
        [],
);
export const selectSubcategories = createSelector(
    [selectAllCategories],
    (categories = []) =>
        (Array.isArray(categories) && categories?.filter((category) => category.rootCategoryId)) ||
        [],
);
export const selectFilters = createSelector(
    (state: ApplicationState) => state.recipe.filters,
    (filters) => ({
        searchString: filters.searchString,
        allergens: [...filters.allergens],
        garnish: [...filters.garnish],
        meat: [...filters.meat],
        subcategoryIds: [...filters.subcategoryIds],
        categoryName: [...filters.categoryName],
        authors: [...filters.authors],
    }),
);

export const selectSubCategoriesByTitles = createSelector(
    [selectCategories, (_: ApplicationState, titles: string[]) => titles],
    (categories = [], titles) => {
        const selectedCategories =
            (Array.isArray(categories) &&
                categories?.filter((category) => titles.includes(category.title))) ||
            [];
        return Array.isArray(selectedCategories)
            ? selectedCategories
                  .map((category) =>
                      Array.isArray(category.subCategories)
                          ? category.subCategories.map((subCategory) => subCategory._id)
                          : [],
                  )
                  .flatMap((ids) => ids)
            : [];
    },
);

export const selectRecipeSubCategories = createSelector(
    [selectSubcategories, (_: ApplicationState, subcategoryIds: string[]) => subcategoryIds],
    (categories = [], ids) =>
        (Array.isArray(categories) &&
            categories?.filter((category) => ids.includes(category._id))) ||
        [],
);

export const selectRecipeCategories = createSelector(
    [selectCategories, (_: ApplicationState, categoryIds: string[]) => categoryIds],
    (categories = [], ids) =>
        (Array.isArray(categories) &&
            categories?.filter((category) => ids.includes(category._id))) ||
        [],
);

export const selectCategoryById = createSelector(
    [selectAllCategories, (_: ApplicationState, id: string) => id],
    (categories = [], id) =>
        (Array.isArray(categories) && categories.find((category) => category._id === id)) || null,
);
export const selectCurrentRootCategory = createSelector(
    [selectCategories, (_: ApplicationState, name: string) => name],
    (categories = [], name) =>
        (Array.isArray(categories) && categories.find((category) => category.category === name)) ||
        null,
);

export const selectGlobalLoading = createSelector(
    (state: ApplicationState) => state,
    (state) => {
        const apiStates = [
            state.recipeApi?.queries || {},
            state.recipeApi?.mutations || {},
            state.recipeApi?.queries || {},
            state.recipeApi?.mutations || {},
            state.categoryApi?.queries || {},
            state.categoryApi?.mutations || {},
            state.userApi?.queries || {},
            state.userApi?.mutations || {},
        ];

        return apiStates.some((apiState) =>
            Object.values(apiState).some((item) => item?.status === 'pending'),
        );
    },
);
