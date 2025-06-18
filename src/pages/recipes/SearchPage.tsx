import { Box, Grid } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { UiCardGrid } from '~/components/ui/UiCardGrid';
import { UiShowMoreButton } from '~/components/ui/UiShowMoreButton';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useToast } from '~/hooks/use-toast';
import { useRecipesSearch } from '~/store/hooks';
import { paginationSelector, setCurrentPage } from '~/store/recipe-slice';
import { selectFilters } from '~/store/selectors';
import { Recipe } from '~/types';

export const SearchPage = memo(() => {
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const pagination = useSelector(paginationSelector);
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showError } = useToast();

    const { isError, data, refetch } = useRecipesSearch();

    const hasMore = pagination.totalPages ? pagination.currentPage < pagination.totalPages : false;

    useEffect(() => {
        setAllRecipes([]);
        dispatch(setCurrentPage(1));
        refetch();
    }, [filters, dispatch]);

    useEffect(() => {
        if (!data) return;

        const newIds = new Set(data.map((item) => item._id));

        setAllRecipes((prev) => {
            const filteredPrev = prev.filter((item) => !newIds.has(item._id));
            return [...filteredPrev, ...data];
        });
    }, [data]);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [filters, dispatch]);

    useEffect(() => {
        if (isError) {
            navigate(-1);
            showError(NOTIFICATION_MESSAGES.GET_RECIPES_ERROR);
        }
    }, [isError, showError]);

    const loadMore = () => {
        if (hasMore) {
            dispatch(setCurrentPage(pagination.currentPage + 1));
        }
    };
    return (
        <Grid as='main' gap={{ base: 4, md: 6 }}>
            <SearchBar title='Приятного аппетита!' />

            <Box px={{ base: 4, md: 5, lg: 6 }} pb={{ base: 4, md: 0 }}>
                <UiCardGrid data={allRecipes} />
                {hasMore && <UiShowMoreButton onShowMore={loadMore} />}
            </Box>
        </Grid>
    );
});
