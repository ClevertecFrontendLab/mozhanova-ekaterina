import { Box, Grid } from '@chakra-ui/react';
import { memo } from 'react';

import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { UiCardGrid } from '~/components/ui/UiCardGrid';
import { UiShowMoreButton } from '~/components/ui/UiShowMoreButton';
import { usePagination } from '~/hooks/use-pagination';
import { useRecipesSearch } from '~/query/hooks/use-recipe-search';

export const SearchPage = memo(() => {
    const { data } = useRecipesSearch();

    const { hasMore, loadMore, recipesToShow } = usePagination(data);

    return (
        <Grid as='main' gap={{ base: 4, md: 6 }}>
            <SearchBar title='Приятного аппетита!' />

            <Box px={{ base: 4, md: 5, lg: 6 }} pb={{ base: 4, md: 0 }}>
                <UiCardGrid data={recipesToShow} />
                {hasMore && <UiShowMoreButton onShowMore={loadMore} />}
            </Box>
        </Grid>
    );
});
