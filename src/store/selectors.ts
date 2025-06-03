import { createSelector } from 'reselect';

import {
    getAllSubsByRoots,
    getCategoriesByIds,
    getCategoriesByTitles,
    getCategoryById,
    getCategoryByName,
} from '~/utils/get-categories';
import { decodeToken } from '~/utils/jwt-utils';

import { ApplicationState } from './configure-store';

export const accessToken = (state: ApplicationState) => state.user.accessToken || null;
export const isAuthenticated = (state: ApplicationState) => !!state.user.accessToken;
export const selectAllCategories = (state: ApplicationState) => state.category.categories || [];
export const currentRecipeSelector = (state: ApplicationState) => state.recipe.current || null;
export const paginationSelector = (state: ApplicationState) => state.recipe.pagination || null;
export const selectCurrentUser = (state: ApplicationState) => state.user.user || null;

export const selectCategories = createSelector([selectAllCategories], (categories) =>
    Array.isArray(categories) ? categories?.filter((category) => !category.rootCategoryId) : [],
);

export const selectSubcategories = createSelector([selectAllCategories], (categories) =>
    Array.isArray(categories) ? categories.filter((category) => category.rootCategoryId) : [],
);

export const selectCurrentUserId = (state: ApplicationState) => decodeToken(state.user.accessToken);

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

export const selectCategoriesByTitles = createSelector(
    [selectCategories, (_: ApplicationState, titles: string[]) => titles],
    (categories, titles) => {
        if (!Array.isArray(categories) || !Array.isArray(titles)) return [];
        const selectedCategories = getCategoriesByTitles(categories, titles);
        return getAllSubsByRoots(selectedCategories).flatMap((category) => category._id);
    },
);

export const selectSubCategoriesByTitles = createSelector(
    [selectSubcategories, (_: ApplicationState, titles: string[]) => titles],
    (categories, titles) => {
        if (!Array.isArray(categories) || !Array.isArray(titles)) return [];
        const selectedCategories = getCategoriesByTitles(categories, titles);
        return selectedCategories.map((category) => category._id);
    },
);

export const selectRecipeSubCategories = createSelector(
    [selectSubcategories, (_: ApplicationState, subcategoryIds: string[]) => subcategoryIds],
    (categories, ids) =>
        Array.isArray(categories) && Array.isArray(ids) ? getCategoriesByIds(categories, ids) : [],
);

export const selectRecipeCategories = createSelector(
    [
        selectSubcategories,
        selectCategories,
        (_: ApplicationState, categoryIds: string[]) => categoryIds,
    ],
    (subCategories, categories, ids) => {
        if (!Array.isArray(subCategories) || !Array.isArray(categories) || !Array.isArray(ids))
            return [];
        const selectedSubCategories = getCategoriesByIds(subCategories, ids);
        const rootIds = selectedSubCategories.map((category) => category?.rootCategoryId);
        return getCategoriesByIds(categories, rootIds);
    },
);
export const selectSubCategoriesTitlesByIds = createSelector(
    [selectSubcategories, (_: ApplicationState, categoryIds: string[]) => categoryIds],
    (categories, ids) =>
        Array.isArray(categories) && Array.isArray(ids)
            ? getCategoriesByIds(categories, ids).map((category) => category.title)
            : [],
);

export const selectRecipeCategoriesIds = createSelector(
    [selectSubcategories, (_: ApplicationState, categoryIds: string[]) => categoryIds],
    (categories, ids) => {
        if (!Array.isArray(categories) || !Array.isArray(ids)) return [];
        const selectedCategories = getCategoriesByIds(categories, ids);
        return selectedCategories.map((category) => category.rootCategoryId);
    },
);

export const selectCategoryById = createSelector(
    [selectAllCategories, (_: ApplicationState, id: string) => id],
    (categories, id) => (Array.isArray(categories) ? getCategoryById(categories, id) : null),
);

export const selectCurrentRootCategory = createSelector(
    [selectCategories, (_: ApplicationState, name: string) => name],
    (categories, name) => (Array.isArray(categories) ? getCategoryByName(categories, name) : null),
);

export const selectGlobalLoading = createSelector(
    (state: ApplicationState) => state,
    (state) => {
        const apiStates = [
            state['authorized-api']?.queries || {},
            state['authorized-api']?.mutations || {},
            state['unauthorized-api']?.queries || {},
            state['unauthorized-api']?.mutations || {},
        ];

        return apiStates.some((apiState) =>
            Object.values(apiState).some((item) => item?.status === 'pending'),
        );
    },
);
