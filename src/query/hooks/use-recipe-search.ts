import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useToast } from '~/hooks/use-toast';
import { Limit } from '~/query/constants/limits';
import { useLazySearchRecipesQuery, useSearchRecipesQuery } from '~/query/recipe-api';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setPaginationMeta } from '~/store/recipe-slice';
import { selectFilters } from '~/store/selectors';

export const useRecipesSearch = () => {
    const filters = useAppSelector(selectFilters);
    const pagination = useAppSelector((state) => state.recipe.pagination);
    const navigate = useNavigate();
    const { showError } = useToast();

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
        if (isError) {
            navigate(-1);
            showError(NOTIFICATION_MESSAGES.GET_RECIPES_ERROR);
        }
    }, [isError, showError]);

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
