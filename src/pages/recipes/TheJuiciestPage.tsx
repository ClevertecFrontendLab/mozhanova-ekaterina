import { Box, Grid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { RelevantKitchenBlock } from '~/components/shared/recipes/RelevantKitchenBlock';
import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { UiCardGrid } from '~/components/ui/UiCardGrid';
import { UiShowMoreButton } from '~/components/ui/UiShowMoreButton';
import { usePagination } from '~/hooks/use-pagination';
import { Limit } from '~/query/constants/limits';
import { useGetPopularRecipesQuery } from '~/query/recipe-api';
import { paginationSelector } from '~/store/recipe-slice';
import { selectFilters } from '~/store/selectors';

export const TheJuiciestPage = () => {
    const pagination = useSelector(paginationSelector);
    const filters = useSelector(selectFilters);

    const { data, isLoading, isError } = useGetPopularRecipesQuery(
        {
            limit: Limit.DEFAULT,
            page: pagination.currentPage,
            ...(filters.allergens.length > 0 && { allergens: filters.allergens }),
            ...(filters.searchString && { searchString: filters.searchString }),
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    const { hasMore, loadMore, recipesToShow } = usePagination(data?.data);

    if (isError || isLoading) return null;

    return (
        <main>
            <SearchBar title='Самое сочное' />
            <Grid
                gap={{ base: 8, md: 10 }}
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <Box>
                    <UiCardGrid data={recipesToShow} />
                    {hasMore && <UiShowMoreButton text='Загрузка' onShowMore={loadMore} />}
                </Box>
                <RelevantKitchenBlock />
            </Grid>
        </main>
    );
};
