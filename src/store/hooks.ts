import { useCallback, useEffect, useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Limit } from '~/query/constants/limits';
import { useLazySearchRecipesQuery, useSearchRecipesQuery } from '~/query/recipe-api';

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
            limit: Limit.DEFAULT,
            page: pagination.currentPage,
            sortBy: 'createdAt',
            sortOrder: 'asc',
            ...(filters.searchString && { searchString: filters.searchString }),
            ...(filters.allergens.length > 0 && { allergens: filters.allergens }),
            ...(filters.garnish.length > 0 && { garnish: filters.garnish }),
            ...(filters.meat.length > 0 && { meat: filters.meat }),
            ...(filters.subcategoryIds.length > 0 && { subcategoriesIds: filters.subcategoryIds }),
        }),
        [filters, pagination.currentPage],
    );

    const { data, isError, isFetching, isLoading, isSuccess, currentData, refetch } =
        useSearchRecipesQuery({
            ...stableArgs,
        });

    useEffect(() => {
        if (data?.meta) {
            dispatch(
                setPaginationMeta({
                    totalPages: data.meta.totalPages,
                }),
            );
        }
    }, [data, dispatch]);

    return {
        data: data?.data,
        meta: data?.meta,
        currentData,
        isLoading,
        isFetching,
        isError,
        isSuccess,
        refetch,
    };
};
export const useLazyRecipesSearch = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectFilters);
    const pagination = useAppSelector((state) => state.recipe.pagination);

    const stableArgs = useMemo(
        () => ({
            limit: Limit.DEFAULT,
            page: pagination.currentPage,
            sortBy: 'createdAt',
            sortOrder: 'asc',
            ...(filters.searchString && { searchString: filters.searchString }),
            ...(filters.allergens.length > 0 && { allergens: filters.allergens }),
            ...(filters.garnish.length > 0 && { garnish: filters.garnish }),
            ...(filters.meat.length > 0 && { meat: filters.meat }),
            ...(filters.subcategoryIds.length > 0 && { subcategoriesIds: filters.subcategoryIds }),
        }),
        [filters, pagination.currentPage],
    );

    const [trigger, { data, isFetching, isError }] = useLazySearchRecipesQuery();

    const runSearch = useCallback(() => {
        trigger(stableArgs);
    }, [stableArgs, trigger]);

    useEffect(() => {
        if (data?.meta) {
            dispatch(
                setPaginationMeta({
                    totalPages: data.meta.totalPages,
                }),
            );
        }
    }, [data, dispatch]);

    return {
        meta: data?.meta,
        data: data?.data,
        isError,
        isFetching,
        runSearch,
    };
};
