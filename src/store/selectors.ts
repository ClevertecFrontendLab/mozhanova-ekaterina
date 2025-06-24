import { createSelector } from 'reselect';

import { UserDto } from '~/types';
import {
    getAllSubsByRoots,
    getCategoriesByIds,
    getCategoriesByTitles,
    getCategoryById,
    getCategoryByName,
    getUsersByIds,
} from '~/utils/get-categories';
import { decodeToken } from '~/utils/jwt-utils';

import { selectAllCategories } from './category-slice';
import { ApplicationState } from './configure-store';
import { accessToken, selectAllUsers, selectCurrentUser, selectStatistics } from './user-slice';

export const selectCategories = createSelector([selectAllCategories], (categories) =>
    Array.isArray(categories) ? categories?.filter((category) => !category.rootCategoryId) : [],
);

export const selectSubcategories = createSelector([selectAllCategories], (categories) =>
    Array.isArray(categories) ? categories.filter((category) => category.rootCategoryId) : [],
);

export const selectCurrentUserId = createSelector(
    [accessToken],
    (token) => decodeToken(token) || '',
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
    [selectSubcategories, (_: ApplicationState, subcategoryIds?: string[]) => subcategoryIds],
    (categories, ids) =>
        Array.isArray(categories) && Array.isArray(ids) ? getCategoriesByIds(categories, ids) : [],
);

export const selectRecipeCategories = createSelector(
    [
        selectSubcategories,
        selectCategories,
        (_: ApplicationState, categoryIds?: string[]) => categoryIds,
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

export const selectStatisticsCounts = createSelector(
    [selectStatistics, selectCurrentUser],
    (statistics, user) => {
        const likes = statistics?.likes.reduce((acc, like) => acc + like.count, 0) || 0;
        const bookmarks =
            statistics?.bookmarks.reduce((acc, bookmark) => acc + bookmark.count, 0) || 0;
        const subscribersCount = user?.subscribers.length || 0;
        return {
            likes,
            bookmarks,
            subscribersCount,
            recommendationsCount: statistics?.recommendationsCount || 0,
        };
    },
);

export const selectSubscribers = createSelector(
    [selectCurrentUser, selectAllUsers],
    (user, allUsers) => {
        if (!user) return [];
        return user.subscribers
            .map((subscriber) => allUsers.find((user) => user.id === subscriber))
            .filter((user): user is UserDto => user !== undefined);
    },
);

export const selectRecommenderProfile = createSelector(
    [selectStatisticsCounts],
    (statistics) => statistics.subscribersCount > 100 && statistics.bookmarks > 200,
);

export const selectRecommendedBy = createSelector(
    [selectAllUsers, (_: ApplicationState, ids?: string[]) => ids],
    (users, ids) => (ids ? getUsersByIds(users, ids) : null),
);

export const selectGlobalLoading = createSelector(
    (state: ApplicationState) => state,
    (state) => {
        const apiServices = [state['authorized-api'], state['unauthorized-api']];

        return apiServices.some((apiState) => {
            if (!apiState) return false;

            const allOperations = [
                ...Object.values(apiState.queries || {}),
                ...Object.values(apiState.mutations || {}),
            ];

            return allOperations.some((operation) => {
                if (
                    operation?.endpointName === 'toggleSubscription' ||
                    operation?.endpointName === 'searchRecipes'
                ) {
                    return false;
                }

                if (
                    operation?.endpointName === 'getBloggers' ||
                    operation?.endpointName === 'getBloggerById'
                ) {
                    return operation?.status === 'pending' && operation?.data === undefined;
                }

                return operation?.status === 'pending';
            });
        });
    },
);
