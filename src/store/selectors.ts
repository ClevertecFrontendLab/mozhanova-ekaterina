import { createSelector } from 'reselect';

import { ApplicationState } from './configure-store';

export const selectAllCategories = (state: ApplicationState) => state.category.categories;
export const selectCategories = createSelector([selectAllCategories], (categories) =>
    categories.filter((category) => !category.rootCategoryId),
);
export const selectSubcategories = createSelector([selectAllCategories], (categories) =>
    categories.filter((category) => category.rootCategoryId),
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
    (categories, titles) => {
        const selectedCategories = categories.filter((item) => titles.includes(item.title));
        return selectedCategories
            .map((item) => item.subCategories.map((subCategory) => subCategory._id))
            .flatMap((ids) => ids);
    },
);

export const selectRecipeSubCategories = createSelector(
    [selectSubcategories, (_: ApplicationState, subcategoryIds: string[]) => subcategoryIds],
    (categories, ids) => categories.filter((c) => ids.includes(c._id)),
);

export const selectRecipeCategories = createSelector(
    [selectCategories, (_: ApplicationState, categoryIds: string[]) => categoryIds],
    (categories, ids) => categories.filter((c) => ids.includes(c._id)),
);

export const selectCategoryById = createSelector(
    [selectAllCategories, (_: ApplicationState, id: string) => id],
    (categories, id) => categories.find((category) => category._id === id),
);
export const selectCurrentRootCategory = createSelector(
    [selectCategories, (_: ApplicationState, name: string) => name],
    (categories, name) => categories.find((category) => category.category === name),
);

export const selectGlobalLoading = createSelector(
    (state: ApplicationState) => state,
    (state) => {
        // Получаем состояния из всех API
        const apiStates = [
            state.recipeApi?.queries || {},
            state.recipeApi?.mutations || {},
            state.categoryApi?.queries || {},
            state.categoryApi?.mutations || {},
        ];

        // Проверяем все типы запросов
        return apiStates.some((apiState) =>
            Object.values(apiState).some((item) => item?.status === 'pending'),
        );
    },
);

// export const selectGlobalError = createSelector(
//     (state: ApplicationState) => state,
//     (state) => {
//         // Получаем состояния из всех API
//         const apiStates = [
//             state.recipeApi?.queries || {},
//             state.recipeApi?.mutations || {},
//             state.categoryApi?.queries || {},
//             state.categoryApi?.mutations || {},
//         ];

//         // Проверяем все типы запросов
//         return apiStates.some((apiState) =>
//             Object.values(apiState).some(
//                 (item) => item?.status === 'rejected' || item?.error !== undefined,
//             ),
//         );
//     },
// );
