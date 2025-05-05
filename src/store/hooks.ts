import { useEffect, useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { useSearchRecipesQuery } from '~/query/recipe-api';

import { ApplicationState, store } from './configure-store';
import { setPaginationMeta } from './recipe-slice';
import { selectFilters } from './selectors';
type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useRecipesSearch = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectFilters);
    const pagination = useAppSelector((state) => state.recipe.pagination);
    const stableArgs = useMemo(
        () => ({
            limit: 8,
            page: pagination.currentPage,
            ...(filters.searchString && { searchString: filters.searchString }),
            ...(filters.allergens.length > 0 && { allergens: filters.allergens }),
            ...(filters.garnish.length > 0 && { garnish: filters.garnish }),
            ...(filters.meat.length > 0 && { meat: filters.meat }),
            ...(filters.subcategoryIds.length > 0 && { subcategoriesIds: filters.subcategoryIds }),
        }),
        [filters, pagination.currentPage],
    );

    const queryResult = useSearchRecipesQuery(stableArgs, {
        refetchOnMountOrArgChange: true,
        skip: !filters.searchString && filters.allergens.length === 0,
    });

    useEffect(() => {
        if (queryResult.data?.meta) {
            dispatch(
                setPaginationMeta({
                    totalPages: queryResult.data.meta.totalPages,
                }),
            );
        }
    }, [queryResult.data, dispatch]);

    return queryResult;
};
